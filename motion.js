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

    // Pointer parallax on declared layers. Fine pointers only: on touch there is
    // no cursor to track and the listener would be dead weight.
    function initParallax() {
        var layers = gsap.utils.toArray('[data-parallax]');
        if (!layers.length) return;
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        var cx = window.innerWidth / 2;
        var cy = window.innerHeight / 2;

        var onMove = function (e) {
            layers.forEach(function (layer) {
                var strength = parseFloat(layer.getAttribute('data-parallax')) || 0.04;
                gsap.to(layer, {
                    x: (e.clientX - cx) * strength,
                    y: (e.clientY - cy) * strength * 0.8,
                    duration: 0.9,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
        };

        var onResize = function () {
            cx = window.innerWidth / 2;
            cy = window.innerHeight / 2;
        };

        window.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });

        return function cleanupParallax() {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('resize', onResize);
            gsap.set(layers, { clearProps: 'transform' });
        };
    }

    // Section reveals. Elements already on screen at load are left alone; only
    // what the user scrolls to gets an entrance, so the hero is never delayed.
    function initReveals() {
        if (!ScrollTrigger) return;

        var groups = [
            '.verticals-grid > *',
            '.services-grid > *',
            '.ai-flow > *',
            '.engagement-grid > *',
            '.dashboard-grid > *',
            '.about-grid > *',
            '.portal-card'
        ];

        groups.forEach(function (selector) {
            var items = gsap.utils.toArray(selector);
            if (!items.length) return;

            // 1 rather than 0: an element that somehow never enters still reads.
            gsap.set(items, { opacity: 0, y: 26 });

            ScrollTrigger.batch(items, {
                start: 'top 90%',
                once: true,
                onEnter: function (batch) {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: 'power3.out',
                        stagger: 0.06,
                        overwrite: true
                    });
                }
            });
        });

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

    // The hero. The headline is the LCP candidate, so it is never fully hidden:
    // a masked line rise keeps it painted while still reading as a reveal.
    function initHero() {
        var title = document.querySelector('[data-split="lines"]');
        var eyebrow = document.querySelector('.hero-eyebrow');
        var subtitle = document.querySelector('.hero-subtitle');
        var actions = document.querySelector('.hero-actions');
        var visual = document.querySelector('.hero-visual');

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
        var secondary = [eyebrow, subtitle, actions, visual].filter(Boolean);
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

    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', function () {
        initHero();
        initReveals();
        var cleanupParallax = initParallax();

        // Only the triggers created in this branch are reverted; the scroll
        // chrome created above must survive a reduced-motion toggle.
        return function cleanup() {
            if (typeof cleanupParallax === 'function') cleanupParallax();
        };
    });
})();
