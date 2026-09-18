# AGENTS.md — JL Tech Solutions

Corporate single-page site for **JL Tech Solutions** (IT infrastructure / SecOps).
Live: <https://limjonathan.github.io/jltech-solutions/>

## Stack

- Static HTML + CSS + vanilla JS. No build step, no framework, no npm dependencies.
- **GSAP 3.15 vendored into `vendor/gsap/`** (core, ScrollTrigger, SplitText, DrawSVG).
  Free for commercial use since Apr 2025; see `vendor/gsap/README.txt`. Self-hosted
  rather than CDN so the page has no third-party runtime dependency and needs no SRI
  upkeep. Loaded `defer`, so it never blocks LCP.
- Google Fonts: **Geist** (display/body) + **JetBrains Mono** (ops/terminal layer).
- `server.js` — zero-dependency Node static server for local dev only. GitHub Pages
  ignores it (Pages serves the branch root as static files).

## Commands

```bash
npm start              # or: node server.js  -> http://localhost:8005
PORT=3000 node server.js
```

There is no test suite, linter, or bundler. Verify changes by loading the page in a
browser (see "Verification" below).

## Layout

```
index.html      Single page: hero (asymmetric split + topology canvas), industries,
                9 services (+9 modals), AI section, engagement models, ops dashboard,
                about, inquiry form, footer
style.css       Token layer + design system + responsive breakpoints
app.js          Interactivity: nav, modals, ops log, telemetry, inquiry form
motion.js       ALL GSAP timelines. One gsap.matchMedia() block owns every tween.
background.js   Topology canvas behind the hero (rAF loop that pauses off-screen)
                Section shapes: industries rail, 9-row sticky service stack,
                drawn AI pipeline, asymmetric engagement rows, two media bands
server.js       Dev-only static server (rate limiting, security headers, caching)
sitemap.xml     Single-URL sitemap
robots.txt      Crawl rules -> sitemap
vendor/gsap/    Vendored GSAP 3.15 + plugins (see README.txt there)
assets/
  logo.svg          Primary logo (viewBox cropped tight to the artwork)
  logo-light.svg    Light variant (#4D4D4D -> #E2E8F0) for dark backgrounds
  og-cover.jpg      1200x630 social card (photographic, so JPEG not PNG)
  grain.png         128x128 noise tile, tiled by body::after
  tech-datacenter.webp  Media band image (ComfyUI / DreamShaperXL Lightning)
  tech-network.webp     Media band image (same pipeline)
  logo.png          3125x3125 RGBA source raster (padding NOT trimmed; source only)
  logo.jpg          Unused, gitignored
```

## Design system locks

Change these in one place or not at all:

| Lock | Rule |
|---|---|
| THEME | One light theme. No section flips to inverted mode mid-page. |
| COLOR | One accent (`--color-primary`). Status hues are semantic only, never decorative. Text on light blue uses `--color-primary-dark`. |
| SHAPE | Three radii only: `--radius-sm/md/lg` (+ `--radius-pill`). No ad-hoc values. |
| MOTION | One easing + duration vocabulary: `--ease-out`, `--ease-in-out`, `--ease-spring`, `--dur-press/ui/surface`. No invented curves. |
| TYPE | `--font-sans` (Geist) for everything; `--font-mono` for the ops/terminal layer only. |

## Motion invariants

**1. `window.addEventListener('scroll')` is banned.** It fires every scroll frame and is
jank-prone. Use ScrollTrigger (pin/scrub), IntersectionObserver (boolean "am I in this
section"), or CSS scroll-driven animations as decoration only. Note: CSS
`animation-timeline` is still **not Baseline** in 2026 (Firefox stable is flag-gated) and
`@supports (animation-timeline: scroll())` wrongly reports true on flagged Firefox, so
never let anything load-bearing depend on it.

**2. Hidden start states are applied by JS, never CSS.** `motion.js` calls `gsap.set(...)`
only inside a `prefers-reduced-motion: no-preference` block. If GSAP is blocked or fails,
the page renders fully visible rather than blank. Verified with JS disabled.

**3. `prefers-reduced-motion: reduce` must collapse everything.** Auroras are gated behind
`no-preference`; the topology canvas draws one static frame and starts no loop; all
timelines sit inside the matchMedia block. Verify with computed `animation-duration` and
`animation-iteration-count`, **not** `animation-name` - the global `!important` reduce rule
zeroes the duration while leaving the name intact, so `animationName !== 'none'` is a
false negative.

**4. Animate `transform` and `opacity` only**, never `top/left/width/height`. Press
feedback is `transform: scale(0.975)` at `--dur-press`.

**5. Never fade a container that holds a CTA.** Dimming text dims the button inside it and
drops it below 4.5:1 mid-scroll. The hero scrub translates but deliberately does not fade.

**6. The topology canvas stays contained.** It is absolutely positioned inside the hero and
paused by IntersectionObserver when off-screen and on `visibilitychange`. A permanently
running full-viewport canvas is a battery and INP tax for no benefit.

**7. The industries rail may listen to its own scroll, never the page's.** The one
`scroll` listener in the codebase is attached to `[data-rail-viewport]`, a contained
horizontal scroller, and is rAF-throttled. That is not the banned page-scroll pattern. If
you ever attach one to `window`, you have reintroduced the thing invariant 1 forbids.

**8. The service stack is CSS-only.** `position: sticky` with a per-row `top` offset
(`--row-i`) does the stacking, so it still reads as an ordered list with JS or motion off.
GSAP only adds a scale on the outgoing row. Do not move the stacking into JS.

**9. Media bands carry their own scrim.** `.media-band-scrim` holds white text above 4.5:1
over an image whose luminance is not ours to control. Never remove it, and never place text
on a band without it. Below 768px the band stacks (image on top, copy on dark below) and the
scrim switches to a vertical gradient.

**10. Telemetry count-ups and the live updater must not both write a value.** `motion.js`
sets `dataset.counting` while a `.stat-value` counts up and `app.js` skips any element
carrying that flag. Removing either half makes the panel flicker.

**7. Scroll progress uses `fromTo`.** The bar ships at `transform: scaleX(0)` with
`width: 100%`; a plain `to()` would animate 0 to 1 to 1 and never appear to move.

## Critical invariants

**1. `assets/logo.svg` is viewBox-cropped — do not "fix" the size with negative margins.**
The original export was a 3125×3125 canvas where the artwork occupied only the central
42% (29% transparent padding per side). That was cropped to `viewBox="890 910 1340 1300"`
so the artwork now fills ~98% of its box. Sizing is therefore just a plain `height` in CSS
(`.nav-logo` 44px, `.footer-logo` 120px, `.portal-mini-logo` 56px). Re-introducing
negative margins or oversized heights will make the logo overflow the header again.

If the logo asset is ever re-exported from source, **re-crop the viewBox** and re-verify
fill ratio (target ≥95%).

**2. The inquiry form must never claim a delivery that did not happen.**
`FORM_ENDPOINT` (top of the form section in `app.js`) is empty by default. With it empty
the form opens a prefilled `mailto:` draft and the receipt says so. GitHub Pages cannot
accept a POST (verified: returns `405`), so do not point `FORM_ENDPOINT` at the Pages URL.
To enable real delivery, set it to a Formspree / Web3Forms / own-API URL — the POST path
already renders success **only** on a 2xx and falls back to `mailto:` on failure.

A Formspree/Web3Forms endpoint ID is a **public form identifier**, not a secret (it is
visible in page source by design). Never commit a server-side API key.

**3. Contact address is assembled at runtime.** `CONTACT_USER` + `CONTACT_DOMAIN` in
`app.js` are joined at runtime so the literal address is not in the HTML. Swap these for a
role alias (e.g. `info@`) when one exists — a personal Gmail in a public repo is scrapeable.

**4. User input never reaches `innerHTML`.** `addLogEntry` and `showFormError` build DOM
nodes with `textContent`. An earlier version interpolated the Company field into
`innerHTML`, which was an exploitable DOM XSS sink. Keep it that way.

**5. Colour contrast.** Status colours have text-safe variants for use as text on light
surfaces (all ≥4.5:1): `--color-accent-text`, `--color-alert-text`, `--color-warning-text`.
`--color-primary` is for fills/icons; use `--color-primary-dark` for text on
`--color-primary-light`. The bare `--color-accent/-alert/-warning` values fail AA as text.

**6. Accessibility affordances that must not regress:** `<main id="main-content">` wraps the
content sections; the ops log has `tabindex="0"` + `aria-label`; service cards are
`role="button"` + `tabindex="0"` with Enter/Space handling; modals have a max-height with
internal scroll and restore focus to the triggering card on close.

## Verification

```bash
node server.js
```

Then in a browser:
- Header: logo sits fully inside the bar at 320-1440px; no horizontal scroll.
- Motion: the hero headline reveals in at most 2 lines and both CTAs sit above the fold;
  scroll-progress fills 0 -> 25% -> 50% -> 100% monotonically; the nav marks the current
  section; the topology canvas pauses once the hero is scrolled away.
- Reduced motion: emulate `prefers-reduced-motion: reduce`, then assert that no hero or
  section element is left below opacity 1, that every CSS animation reports
  `animation-duration` under 0.01s (not just `animation-name: none`), and that the canvas
  renders exactly one static frame.
- JS disabled: the hero and every section must still render fully visible. Hidden start
  states are applied by JS, so a blocked GSAP must not blank the page.
- Rail: the next/prev buttons advance one card, the `NN / 05` counter tracks it, prev is
  disabled at the start, and drag-to-pan does not fire a click on release.
- Service stack: rows are `position: sticky`, each "Learn more" opens its modal, and Escape
  returns focus to that button (not the row).
- Media bands: both images load, and white band text clears 4.5:1 against the scrim at
  desktop and in the stacked mobile layout.
- Nothing is left hidden: after a slow full-page scroll, no element outside `.spec-modal`
  sits below opacity 1 except the intentional ones (`.pulse-indicator`, a disabled
  `.rail-btn`, `.portal-mini-logo`, the hidden radio inputs, `.barcode-stripes`).
- Modal at 740x420 (landscape phone): content fits, `.modal-body` scrolls internally, the
  close button is reachable, and Escape restores focus to the triggering card.
- Form: submit valid data -> a `mailto:` draft opens and the receipt reads "Draft Ready to
  Send". Reset -> exactly one severity option highlighted, matching the checked value.
- Accessibility: axe must report zero violations on desktop and mobile, at rest and
  mid-scroll. Disable the reveal transitions before auditing, or run the scroll sweep
  first and let the tweens settle - sampling mid-tween reports blended colours as
  contrast failures that do not exist in the settled state.

## Secrets

`.git/config` historically held a GitHub PAT in the remote URL. It was never committed and
has been replaced with a token-free URL, but **revoke that PAT if you have not already**.

A local pre-commit hook (`.git/hooks/pre-commit`, not version-controlled) blocks commits
containing token/key patterns. Re-install it on a fresh clone — see `CHANGELOG.md`.
Never commit `.env` (gitignored), credentials, or server-side keys.

## Deployment

GitHub Pages, `main` branch root, no custom domain. Push to `main` to publish.

All canonical / OG / schema.org / robots URLs point at the Pages URL. The site previously
pointed them at `jltech.com`, which is a **different company** (Janus Logistics
Technologies) — that would have told Google the real page lives elsewhere. If a real
domain is ever acquired, update `index.html` (canonical, `og:url`, `og:image`,
`twitter:image`, JSON-LD `url`/`logo`) plus `robots.txt` and `sitemap.xml`, and set it as
the Pages custom domain.
