/* ==========================================================================
   JL TECH SOLUTIONS - Hero background field
   --------------------------------------------------------------------------
   A particle flow field drifting behind the hero. Replaces the static gradient
   and the old topology canvas.

   Lifecycle rules it must keep (these are what make a full-bleed canvas
   acceptable at all):
     - rAF stops the moment the hero leaves the viewport or the tab is hidden.
       A permanently animating full-viewport canvas is a battery and INP tax for
       no benefit once the hero is scrolled past.
     - Under prefers-reduced-motion it draws ONE static frame and never loops.
     - DPR capped at 2, particle count derived from area and hard-capped.
     - Degrades silently: no element or no 2D context means nothing runs and the
       hero is unaffected.
   ========================================================================== */
(function () {
    'use strict';

    var canvas = document.getElementById('hero-field');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* ------------------------------------------------------------- tuning */
    var AREA_PER_PARTICLE = 9000;   // px^2 of canvas per particle
    var MIN_PARTICLES = 140;
    var MAX_PARTICLES = 460;
    var MAX_DPR = 2;

    var SPEED = 1.15;               // px per frame along the field
    var FIELD_SCALE = 0.0016;       // spatial frequency of the flow field
    var FIELD_DRIFT = 0.00016;      // how fast the field itself evolves
    var TRAIL_FADE = 0.042;         // per-frame alpha decay, via destination-out

    var POINTER_RADIUS = 190;
    var POINTER_PUSH = 2.4;

    var STROKE = 'rgba(37, 99, 235, 0.5)';    // particle trail
    var DOT = 'rgba(29, 78, 216, 0.7)';       // particle head

    /* ------------------------------------------------------------ state */
    var particles = [];
    var w = 0;
    var h = 0;
    var rafId = null;
    var running = false;
    var inView = true;
    var time = 0;
    var pointer = { x: -9999, y: -9999, active: false };

    function rand(min, max) { return min + Math.random() * (max - min); }

    function particleCount() {
        var byArea = Math.round((w * h) / AREA_PER_PARTICLE);
        return Math.max(MIN_PARTICLES, Math.min(MAX_PARTICLES, byArea));
    }

    function spawn() {
        return {
            x: rand(0, w),
            y: rand(0, h),
            age: Math.floor(rand(0, 260)),
            // Per-particle speed variance. Without it the field reads as one
            // rigid drift and looks mechanical.
            speed: rand(0.55, 1.5)
        };
    }

    function seed() {
        var n = particleCount();
        particles = new Array(n);
        for (var i = 0; i < n; i++) particles[i] = spawn();
    }

    /* Cheap, dependency-free flow field. Two crossed trig terms give a field
       that curls and drifts without a noise library. */
    function fieldAngle(x, y, t) {
        var a = Math.sin(x * FIELD_SCALE + t) * 1.7;
        var b = Math.cos(y * FIELD_SCALE * 1.3 - t * 0.8) * 1.7;
        return a + b;
    }

    function resize() {
        var rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        var dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        w = rect.width;
        h = rect.height;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // repaint the base so resizing cannot leave stale trails behind
        ctx.clearRect(0, 0, w, h);
        seed();
        draw(true);
    }

    function step() {
        time += FIELD_DRIFT * 1000;

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            var angle = fieldAngle(p.x, p.y, time);

            var vx = Math.cos(angle) * SPEED * p.speed;
            var vy = Math.sin(angle) * SPEED * p.speed;

            // pointer deflection, eased so nothing snaps
            if (pointer.active) {
                var dx = p.x - pointer.x;
                var dy = p.y - pointer.y;
                var d2 = dx * dx + dy * dy;
                if (d2 < POINTER_RADIUS * POINTER_RADIUS && d2 > 0.01) {
                    var d = Math.sqrt(d2);
                    var push = (1 - d / POINTER_RADIUS) * POINTER_PUSH;
                    vx += (dx / d) * push;
                    vy += (dy / d) * push;
                }
            }

            p.prevX = p.x;
            p.prevY = p.y;
            p.x += vx;
            p.y += vy;
            p.age += 1;

            // Recycle rather than kill: keeps the count stable with no allocation
            // churn, and the fade below hides the seam at the edges.
            if (p.x < -16 || p.x > w + 16 || p.y < -16 || p.y > h + 16 || p.age > 420) {
                particles[i] = spawn();
            }
        }
    }

    function fadeTrails() {
        // Decay existing alpha rather than painting a wash over it. Painting a
        // translucent colour would accumulate towards opaque on a transparent
        // canvas; subtracting alpha cannot.
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0, 0, 0, ' + TRAIL_FADE + ')';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over';
    }

    function draw(isStatic) {
        if (isStatic) {
            ctx.clearRect(0, 0, w, h);
        } else {
            fadeTrails();
        }

        ctx.lineCap = 'round';
        ctx.strokeStyle = STROKE;
        ctx.lineWidth = 0.95;
        ctx.fillStyle = DOT;

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];

            if (isStatic || p.prevX === undefined) {
                ctx.fillRect(p.x, p.y, 1.4, 1.4);
                continue;
            }

            ctx.beginPath();
            ctx.moveTo(p.prevX, p.prevY);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
            ctx.fillRect(p.x, p.y, 1.4, 1.4);
        }
    }

    function frame() {
        if (!running) return;
        step();
        draw(false);
        rafId = window.requestAnimationFrame(frame);
    }

    function start() {
        if (running || reduceMotion.matches) return;
        if (!inView || document.hidden) return;
        if (!w || !h) return;
        running = true;
        rafId = window.requestAnimationFrame(frame);
    }

    function stop() {
        running = false;
        if (rafId !== null) {
            window.cancelAnimationFrame(rafId);
            rafId = null;
        }
    }

    function sync() {
        if (inView && !document.hidden) start();
        else stop();
    }

    /* ------------------------------------------------------------- events */
    canvas.addEventListener('pointermove', function (e) {
        var rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
        pointer.active = true;
    });

    canvas.addEventListener('pointerleave', function () {
        pointer.active = false;
        pointer.x = -9999;
        pointer.y = -9999;
    });

    document.addEventListener('visibilitychange', sync);

    if ('ResizeObserver' in window) {
        new ResizeObserver(function () { resize(); }).observe(canvas);
    } else {
        window.addEventListener('resize', resize);
    }

    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            inView = entries[0].isIntersecting;
            sync();
        }, { rootMargin: '80px' }).observe(canvas);
    }

    if (reduceMotion.addEventListener) {
        reduceMotion.addEventListener('change', function () {
            if (reduceMotion.matches) { stop(); draw(true); }
            else sync();
        });
    }

    /* ---------------------------------------------------------------- go */
    resize();
    if (reduceMotion.matches) {
        draw(true);
    } else {
        sync();
    }
})();
