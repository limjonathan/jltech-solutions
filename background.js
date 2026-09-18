/* ==========================================================================
   JL TECH SOLUTIONS - Background field
   --------------------------------------------------------------------------
   The topology canvas behind the hero. One rAF loop, and it stops the moment
   it is off-screen or the tab is hidden: a permanently animating canvas is a
   battery and INP tax for no benefit once the hero has scrolled away.

   Under prefers-reduced-motion it renders a single static frame and never
   starts a loop.

   Degrades silently: if the element or 2D context is unavailable nothing runs
   and the hero is unaffected.
   ========================================================================== */
(function () {
    'use strict';

    var canvas = document.getElementById('topology-canvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Tuning
    var NODE_DENSITY = 1 / 16000;   // nodes per px^2
    var NODE_MIN = 22;
    var NODE_MAX = 58;
    var LINK_DIST = 132;
    var POINTER_RADIUS = 150;
    var NODE_SPEED = 0.16;
    var MAX_DPR = 2;                // never render above 2x

    var COL_NODE = 'rgba(37, 99, 235, 0.55)';
    var COL_NODE_NEAR = 'rgba(37, 99, 235, 0.95)';
    var COL_LINK = 'rgba(37, 99, 235,';
    var COL_LINK_NEAR = 'rgba(29, 78, 216,';

    var nodes = [];
    var w = 0;
    var h = 0;
    var dpr = 1;
    var rafId = null;
    var running = false;
    var inView = true;
    var pointer = { x: -9999, y: -9999, active: false };
    var linkDist = LINK_DIST;

    function rand(min, max) {
        return min + Math.random() * (max - min);
    }

    function nodeCount() {
        var byArea = Math.round(w * h * NODE_DENSITY);
        return Math.max(NODE_MIN, Math.min(NODE_MAX, byArea));
    }

    function makeNode() {
        return {
            x: rand(0, w),
            y: rand(0, h),
            vx: rand(-NODE_SPEED, NODE_SPEED),
            vy: rand(-NODE_SPEED, NODE_SPEED),
            r: rand(1.1, 2.2)
        };
    }

    function seed() {
        var n = nodeCount();
        nodes = [];
        for (var i = 0; i < n; i++) nodes.push(makeNode());
    }

    function resize() {
        var rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        w = rect.width;
        h = rect.height;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Tighter links on narrow canvases so it does not become a hairball.
        linkDist = Math.max(78, Math.min(LINK_DIST, w * 0.26));

        seed();
        draw();
    }

    function step() {
        for (var i = 0; i < nodes.length; i++) {
            var p = nodes[i];

            p.x += p.vx;
            p.y += p.vy;

            // soft wrap with a small overshoot so edges do not look clipped
            if (p.x < -8) p.x = w + 8;
            else if (p.x > w + 8) p.x = -8;
            if (p.y < -8) p.y = h + 8;
            else if (p.y > h + 8) p.y = -8;

            // pointer repulsion, eased so nothing snaps
            if (pointer.active) {
                var dx = p.x - pointer.x;
                var dy = p.y - pointer.y;
                var d2 = dx * dx + dy * dy;
                if (d2 < POINTER_RADIUS * POINTER_RADIUS && d2 > 0.01) {
                    var d = Math.sqrt(d2);
                    var push = (1 - d / POINTER_RADIUS) * 0.55;
                    p.x += (dx / d) * push;
                    p.y += (dy / d) * push;
                }
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        // links first, so nodes sit on top
        for (var i = 0; i < nodes.length; i++) {
            var a = nodes[i];
            for (var j = i + 1; j < nodes.length; j++) {
                var b = nodes[j];
                var dx = a.x - b.x;
                var dy = a.y - b.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > linkDist) continue;

                var t = 1 - dist / linkDist;
                var near = pointer.active &&
                    distanceToPointer(a) < POINTER_RADIUS &&
                    distanceToPointer(b) < POINTER_RADIUS;

                ctx.strokeStyle = (near ? COL_LINK_NEAR : COL_LINK) + (t * (near ? 0.42 : 0.2)).toFixed(3) + ')';
                ctx.lineWidth = near ? 1.05 : 0.8;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        }

        for (var k = 0; k < nodes.length; k++) {
            var n = nodes[k];
            var isNear = pointer.active && distanceToPointer(n) < POINTER_RADIUS;
            ctx.fillStyle = isNear ? COL_NODE_NEAR : COL_NODE;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r + (isNear ? 0.5 : 0), 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function distanceToPointer(n) {
        var dx = n.x - pointer.x;
        var dy = n.y - pointer.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function frame() {
        if (!running) return;
        step();
        draw();
        rafId = window.requestAnimationFrame(frame);
    }

    function start() {
        if (running || reduceMotion.matches) return;
        if (!inView || document.hidden) return;
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

    // --- events -------------------------------------------------------------
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
        }, { rootMargin: '120px' }).observe(canvas);
    }

    if (reduceMotion.addEventListener) {
        reduceMotion.addEventListener('change', function () {
            if (reduceMotion.matches) {
                stop();
                draw();
            } else {
                sync();
            }
        });
    }

    canvas.addEventListener('pointerdown', function () { start(); });

    // --- go -----------------------------------------------------------------
    resize();
    if (reduceMotion.matches) {
        draw();          // one static frame, no loop
    } else {
        sync();
    }
})();
