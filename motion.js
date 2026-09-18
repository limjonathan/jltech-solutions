/* ==========================================================================
   JL TECH SOLUTIONS - Motion layer
   --------------------------------------------------------------------------
   Every timeline on this page lives here, inside one gsap.matchMedia() block,
   so the responsive and reduced-motion variants cannot drift apart.

   Rules this file must keep:
     - No window scroll listener. ScrollTrigger or IntersectionObserver only.
     - transform / opacity only. Never top/left/width/height.
     - Hidden start states are applied by JS, never by CSS. If GSAP is blocked
       or fails, the page renders fully visible instead of blank.
     - prefers-reduced-motion: nothing is hidden and nothing moves.
   ========================================================================== */
(function () {
    'use strict';

    var gsap = window.gsap;
    // No GSAP (offline, blocked, script error): leave the page static and visible.
    if (!gsap) return;

    var ScrollTrigger = window.ScrollTrigger;
    var SplitText = window.SplitText;

    try {
        gsap.registerPlugin(ScrollTrigger, SplitText, window.DrawSVGPlugin);
    } catch (err) {
        // A missing plugin should cost that one effect, not the whole page.
        console.warn('motion: plugin registration issue', err);
    }

    /* ---------------------------------------------------------------- utils */

    // Scroll progress rail + condensed header. ScrollTrigger replaces the
    // scroll listener this used to be, and drives both from one source.
    function initScrollChrome() {
        var header = document.querySelector('.main-header');
        var bar = document.querySelector('.scroll-progress-bar');

        if (header && ScrollTrigger) {
            ScrollTrigger.create({
                start: 40,
                end: 'max',
                onToggle: function (self) { header.classList.toggle('scrolled', self.isActive); }
            });
        }

        if (bar && ScrollTrigger) {
            // fromTo, not to: the bar already sits at scaleX(0), so a plain to()
            // would animate 0 -> 1 -> 1 and never appear to move.
            gsap.fromTo(bar, { scaleX: 0 }, {
                scaleX: 1,
                ease: 'none',
                transformOrigin: '0 50%',
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.4
                }
            });
        }
    }

    // Active-section state for the nav. IntersectionObserver, not ScrollTrigger:
    // far cheaper for a boolean "which section am I in" question.
    function initSectionSpy() {
        var links = Array.prototype.slice.call(document.querySelectorAll('.nav-list .nav-link[href^="#"]'));
        if (!links.length || !('IntersectionObserver' in window)) return;

        var sections = links
            .map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); })
            .filter(Boolean);

        if (!sections.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (link) {
                    link.classList.toggle('is-current', link.getAttribute('href') === '#' + entry.target.id);
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });

        sections.forEach(function (s) { observer.observe(s); });
    }

    // Section reveals. Elements already on screen at load are left alone; only
    // what the user scrolls to gets an entrance, so the hero is never delayed.
    //
    // Containers that hold a CTA translate but never fade: dimming them would
    // drop the button inside below 4.5:1 while the tween runs. Text-only groups
    // can fade safely.
    function initReveals() {
        if (!ScrollTrigger) return;

        var fades = [
            '.ai-flow > *',
            '.ai-trust-bar',
            '.dashboard-grid > *',
            '.about-grid > *'
        ];
        var rises = [
            '.service-row',
            '.vertical-row',
            '.engage-row',
            '.portal-card'
        ];

        function batch(selector, withFade) {
            var items = gsap.utils.toArray(selector);
            if (!items.length) return;

            var from = withFade ? { opacity: 0, y: 26 } : { y: 26 };
            gsap.set(items, from);

            ScrollTrigger.batch(items, {
                start: 'top 92%',
                once: true,
                onEnter: function (group) {
                    var to = withFade
                        ? { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06, overwrite: true }
                        : { y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.07, overwrite: true };
                    gsap.to(group, to);
                }
            });
        }

        fades.forEach(function (sel) { batch(sel, true); });
        rises.forEach(function (sel) { batch(sel, false); });

        gsap.utils.toArray('.section-header').forEach(function (header) {
            gsap.set(header, { opacity: 0, y: 20 });
            gsap.to(header, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: { trigger: header, start: 'top 92%', once: true }
            });
        });
    }

    // AI pipeline: the connectors draw themselves as the section arrives.
    function initPipeline() {
        var paths = gsap.utils.toArray('.ai-link-path, .ai-link-tip');
        if (!paths.length || !window.DrawSVGPlugin) return;

        gsap.set(paths, { drawSVG: '0%' });
        gsap.to(paths, {
            drawSVG: '100%',
            duration: 0.55,
            ease: 'power2.out',
            stagger: 0.14,
            scrollTrigger: { trigger: '.ai-flow', start: 'top 78%', once: true }
        });
    }

    // Telemetry: sparklines draw once, and the headline number counts up once.
    // Restrained on purpose: this panel is functional data, so nothing keeps
    // moving after the entrance, and the live updater takes over afterwards.
    function initTelemetry() {
        if (!ScrollTrigger) return;

        var sparks = gsap.utils.toArray('.stat-spark-path');
        if (sparks.length && window.DrawSVGPlugin) {
            gsap.set(sparks, { drawSVG: '0%' });
            gsap.to(sparks, {
                drawSVG: '100%',
                duration: 0.9,
                ease: 'power2.out',
                stagger: 0.05,
                scrollTrigger: { trigger: '.telemetry-stats', start: 'top 88%', once: true }
            });
        }

        gsap.utils.toArray('.stat-value').forEach(function (el, i) {
            var raw = el.textContent.trim();
            var match = raw.match(/^([\d,.]+)(.*)$/);
            if (!match) return;

            var decimals = (match[1].split('.')[1] || '').length;
            var target = parseFloat(match[1].replace(/,/g, ''));
            var suffix = match[2];
            if (!isFinite(target)) return;

            var proxy = { v: 0 };

            // The live updater in app.js skips any value carrying this flag, so
            // the two never overwrite each other mid-animation.
            gsap.to(proxy, {
                v: target,
                duration: 1.1,
                ease: 'power2.out',
                delay: i * 0.045,
                scrollTrigger: { trigger: el, start: 'top 95%', once: true },
                onStart: function () { el.dataset.counting = '1'; },
                onUpdate: function () {
                    var n = proxy.v;
                    el.textContent = (decimals
                        ? n.toFixed(decimals)
                        : Math.round(n).toLocaleString('en-US')) + suffix;
                },
                onComplete: function () {
                    el.textContent = raw;
                    delete el.dataset.counting;
                }
            });
        });
    }

    // Both sticky stacks (industries, then services): the outgoing row eases back
    // as the next covers it.
    // Scale only, never opacity, so nothing inside loses contrast.
    function stackPolish(selector) {
        gsap.utils.toArray(selector).forEach(function (row, i, all) {
            if (i === all.length - 1) return;
            gsap.to(row, {
                scale: 0.975,
                ease: 'none',
                scrollTrigger: {
                    trigger: row,
                    start: 'top 92px',
                    end: 'bottom 240px',
                    scrub: 0.4
                }
            });
        });
    }

    function initStickyStacks() {
        if (!ScrollTrigger) return;
        stackPolish('.vertical-row');
        stackPolish('.service-row');
    }

    // The hero. The headline is the LCP candidate, so it is never fully hidden:
    // a masked line rise keeps it painted while still reading as a reveal.
    function initHero() {
        var title = document.querySelector('[data-split="lines"]');
        var eyebrow = document.querySelector('.hero-eyebrow');
        var subtitle = document.querySelector('.hero-subtitle');
        var actions = document.querySelector('.hero-actions');

        var supported = SplitText && typeof SplitText.create === 'function';

        if (title && supported) {
            try {
                var split = SplitText.create(title, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
                gsap.from(split.lines, {
                    yPercent: 106,
                    duration: 0.9,
                    ease: 'power4.out',
                    stagger: 0.07,
                    scrollTrigger: { trigger: title, start: 'top 96%', once: true }
                });
            } catch (err) {
                gsap.set(title, { clearProps: 'all' });
            }
        }

        // Secondary elements: set hidden, then tween to visible. Using to()
        // after set() (not from()) is deliberate: from() with an identical
        // start state animates nothing and leaves them invisible.
        var secondary = [eyebrow, subtitle, actions].filter(Boolean);
        if (secondary.length) {
            gsap.set(secondary, { opacity: 0, y: 18 });
            gsap.to(secondary, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: 'power3.out',
                stagger: 0.085,
                delay: 0.34
            });

            // Watchdog. Animation frames are throttled in a background tab, so a
            // tween can sit part-way indefinitely while the user is elsewhere.
            // setTimeout still runs when throttled, so this guarantees the hero
            // is never left invisible. Cheap, and never fires in the normal case.
            window.setTimeout(function () {
                var stranded = secondary.filter(function (el) {
                    return parseFloat(window.getComputedStyle(el).opacity) < 0.9;
                });
                if (stranded.length) gsap.set(stranded, { opacity: 1, y: 0 });
            }, 3000);
        }

        // Scrub the copy out as the hero leaves. No pinning, so the scrollbar,
        // find-in-page and keyboard scrolling all behave normally.
        // Deliberately no opacity fade: dimming the copy also dims the CTA, and
        // a CTA that fades mid-scroll drops below 4.5:1 contrast.
        if (ScrollTrigger) {
            var copy = document.querySelector('.hero-copy');
            if (copy) {
                gsap.to(copy, {
                    y: -48,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.hero-section',
                        start: 'top top',
                        end: 'bottom 45%',
                        scrub: 0.5
                    }
                });
            }
        }

        // SplitText changes layout; recompute trigger positions once fonts land.
        if (document.fonts && document.fonts.ready && ScrollTrigger) {
            document.fonts.ready.then(function () { ScrollTrigger.refresh(); }).catch(function () {});
        }
    }
    /* ---------------------------------------------------------------- boot */

    // Not motion, so it stays on under reduced-motion too.
    initScrollChrome();
    initSectionSpy();

    // Late layout (webfonts, the canvas sizing itself) shifts trigger positions.
    window.addEventListener('load', function () {
        if (ScrollTrigger) ScrollTrigger.refresh();
    });

    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', function () {
        initHero();
        initReveals();
        initPipeline();
        initStickyStacks();
        initTelemetry();
    });
})();
