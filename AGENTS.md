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

### Project showcase

`showcase.html` is a static, public-safe portfolio surface. Its catalog contains
outcome-focused case studies only: no repository URLs, source paths, credentials,
private endpoints, or source tree copies. Every entry points to a local project UI
screenshot or safe workflow capture under `showcase/assets/`. AlphaFleet is the sole
documented exception: its local project source is unavailable, so it retains the
previously shipped poster until a verifiable project UI can be obtained.

```bash
node tools/build-showcase-catalog.js
node tools/build-showcase-fallback.js
node tools/validate-showcase-catalog.js
```

Capture files use stable catalog slugs where practical and may be PNG or JPEG. Do not
publish client documents, credential screens, repository views, or private endpoints.

Capture workflow: use a real Chromium session at 1440x900 against a public route, a
documented demo route, or a synthetic-safe local state; save only the resulting UI
captures under `showcase/assets/`; add the mapping and optional screenshots in
`tools/build-showcase-catalog.js`; then rerun the catalog, fallback, and validation
commands above. The gallery is hash-addressable and clickable: thumbnails change the
active screenshot, Previous/Next stays within the selected category, and Escape closes
the case study and restores focus to its trigger. Verify those interactions and image
loads at 390px, 768px, and 1440px with zero console/page errors and no horizontal
overflow. AlphaFleet remains the sole exception: it has no available local project UI,
so its existing poster is retained; never substitute an unverified or private capture.

Keep filters and case-study hashes readable with JavaScript enabled, preserve the
`noscript` fallback, and verify at 390px, 768px, and 1440px. New artifacts must be
safe presentation assets rather than copied project source.

There is no test suite, linter, or bundler. Verify changes by loading the page in a
browser (see "Verification" below).

```bash
python3 ads/template/build.py            # render all 30 ad creatives
python3 ads/template/build.py security   # re-render one service (all 3 sizes)
```

Ad rendering needs `google-chrome-stable`, ImageMagick and `rsvg-convert` (all present).
The AI backgrounds are optional once they exist - `build.py` only fails if a
`ads/backgrounds/<service>.png` is missing.

## Layout

```
  index.html      Visual home page: hero (single column + animated flow field), industries
                stack, 9 services (+9 modals), AI section, engagement models, ops
                dashboard, about, reel band (featured enterprise film), comparison band,
                inquiry form with on-site video callout,
                inquiry form (engagement path + optional city/ZIP), footer
style.css       Token layer + design system + responsive breakpoints
app.js          Interactivity: nav, modals, ops log, telemetry, inquiry form
motion.js       ALL GSAP timelines. One gsap.matchMedia() block owns every tween.
                The hero background is CSS-only. Section shapes: 9-row sticky service
                stack, tall sticky industries stack, drawn AI pipeline, asymmetric
                engagement rows, comparison band
server.js       Dev-only static server (rate limiting, security headers, caching)
  managed-it-services.html
                  Crawlable nationwide managed IT service page
  cybersecurity.html
                  Crawlable nationwide cybersecurity/SecOps service page
  healthcare-it.html
                  Crawlable healthcare industry page
  philadelphia-on-site-it-support.html
                  Crawlable Philadelphia-area on-site service page
  sitemap.xml     Homepage plus crawlable landing pages
robots.txt      Crawl rules -> sitemap
vendor/gsap/    Vendored GSAP 3.15 + plugins (see README.txt there)
assets/
  logo.svg          Primary logo (viewBox cropped tight to the artwork)
  logo-light.svg    Light variant (#4D4D4D -> #E2E8F0) for dark backgrounds
  og-cover.jpg      1200x630 social card (photographic, so JPEG not PNG)
  grain.png         128x128 noise tile, tiled by body::after
  logo.png          3125x3125 RGBA source raster (padding NOT trimmed; source only)
  logo.jpg          Unused, gitignored
  reel-enterprise.*  Brand film + poster for the reel band (mp4 + -poster.jpg)
  reel-local.*       Second brand film, same set
ads/
  template/ad-template.html  The only ad layout. CSS-var size classes: s-square /
                             s-story / s-linkedin. Tokens resolved at build time.
  template/services.json     All ad copy (10 services x sizes) - edit copy here
  template/build.py          Fills the template, screenshots it with headless Chrome
  backgrounds/<service>.png  10 AI backgrounds, 640x640, generated locally
  output/<service>-<size>.png  30 shipped creatives (1080x1080 / 1080x1920 / 1200x627)
PRICING-RESEARCH.md  US-national 2026 price benchmarks + "affordable deal" bands
```

The two `reel-*` films are ~1.7MB combined (MP4 only) and are **built in a separate project**
(`~/Projects/media/jltech-ads`), then copied here. Regenerate there, not here - the
Remotion source, stills, VO and music bed all live in that repo, and this one only
carries the shipped encodes.

## Ad creatives

30 creatives: 10 services x {1080x1080, 1080x1920, 1200x627}. Copy lives in
`ads/template/services.json`; the layout lives in `ads/template/ad-template.html`.

**1. Text is always composited, never generated.** The backgrounds come from local
ComfyUI (DreamShaper 8 / SD1.5) which cannot render legible text, so every word is real
DOM text rendered by headless Chrome. Never ask a diffusion model for a word.

**2. The backgrounds are decorative and replaceable.** They run CPU-only on this host
(`comfyui` is not GPU-backed here) at ~78s each. If one looks wrong, regenerate that
service alone; `build.py` skips backgrounds that already exist. The layout must stay
readable if a background is swapped or missing.

**3. Text contrast is guaranteed by `.shield`, not by the art.** `.scrim` alone thins
out where the copy sits, so `.shield` adds a text-anchored radial + top gradient. Verified
by rendering each text element over a worst-case flat mid-grey background and measuring the
brightest pixel inside the element's real bounding box. **Worst case is currently
5.17:1** (the CTA: white on `--color-primary`), which clears AA. If you lighten the
scrims or add copy, re-run that check - do not eyeball it.

**4. No prices on the creatives.** Pricing lives in `PRICING-RESEARCH.md` only. It is
market research with sources and dates, not a quote, and not a published price list.

**5. Ad copy must not out-claim the site.** Every chip and tagline restates a claim the
page already makes. Do not introduce SLAs, uptime percentages or guarantees (same rule as
the comparison band).

**6. `--force-device-scale-factor=1` and `--virtual-time-budget` are load-bearing.**
The former keeps the PNG at exact pixel dimensions; the latter waits for the local
`@font-face` (Geist) before the screenshot. Geist is installed system-wide but does **not**
resolve via fontconfig on this host, so the template embeds it with explicit `file://`
`@font-face` rules - keep them.

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
`no-preference`; the CSS hero grid stays static; all timelines sit inside the matchMedia block.
Verify with computed `animation-duration` and
`animation-iteration-count`, **not** `animation-name` - the global `!important` reduce rule
zeroes the duration while leaving the name intact, so `animationName !== 'none'` is a
false negative.

**4. Animate `transform` and `opacity` only**, never `top/left/width/height`. Press
feedback is `transform: scale(0.975)` at `--dur-press`.

**5. Never fade a container that holds a CTA.** Dimming text dims the button inside it and
drops it below 4.5:1 mid-scroll. The hero scrub translates but deliberately does not fade.

**6. The hero background is a CSS perspective grid, and there is no canvas anywhere.** An
earlier revision used a `background.js` canvas (topology mesh, then a particle flow field);
both were rejected on looks and the canvas was deleted. `.hero-tunnel` is pure CSS 3D, so
the hero costs no rAF frames and no GPU compositing beyond the transform. Do not reintroduce
a canvas here without a reason the grid cannot serve.

**7. There are currently ZERO `scroll` listeners in the codebase.** An earlier revision had
exactly one, element-scoped on the industries rail, which was permitted because it was a
contained horizontal scroller rather than the page. The rail is gone and the count is back
to zero. Keep it there.

**8. Both sticky stacks are CSS-only.** `position: sticky` with a per-row `top` offset
(`--row-i`) does the stacking, so it still reads as an ordered list with JS or motion off.
GSAP only adds a scale on the outgoing row. Do not move the stacking into JS.

**9. The comparison band asserts only claims the site already makes.** `.vs-band` is the
closing argument, sitting between About and the inquiry form. Every line in the "us" column
restates a claim made elsewhere on the page (24/7 helpdesk and monitoring, AI-assisted
multi-vendor procurement, continuous SIEM and incident response, compliance evidence, one
predictable monthly cost). The "them" column is a generic alternative and must never name a
competitor. **Do not add response-time SLAs, uptime percentages or guarantees** — the site
does not claim them and they would be fabricated commitments.

**10. Telemetry count-ups and the live updater must not both write a value.** `motion.js`
sets `dataset.counting` while a `.stat-value` counts up and `app.js` skips any element
carrying that flag. Removing either half makes the panel flicker.

**7. Scroll progress uses `fromTo`.** The bar ships at `transform: scaleX(0)` with
`width: 100%`; a plain `to()` would animate 0 to 1 to 1 and never appear to move.

**11. Reel videos are enhancements and must stay optional.** Both `<video>` elements
ship `preload="none"` with their URL in `data-src`; `app.js` attaches
`<source>` elements only within 200px of the viewport, and **skips attaching entirely
under `prefers-reduced-motion: reduce`** so the poster stands in and the ~1.7MB is never
downloaded. `width`/`height` + `aspect-ratio: 2 / 1` reserve the box so attaching cannot
shift layout. Do not put a `src` in the HTML, and do not make any copy depend on a video
having loaded. Only the featured enterprise film is marked for automatic muted playback;
the on-site film beside the inquiry form is user-started. It also must not introduce a `scroll`
listener — it uses the same IntersectionObserver pattern as everything else.

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
  section.
- Reduced motion: emulate `prefers-reduced-motion: reduce`, then assert that no hero or
  section element is left below opacity 1, and that every CSS animation reports
  `animation-duration` under 0.01s (not just `animation-name: none`).
- JS disabled: the hero and every section must still render fully visible. Hidden start
  states are applied by JS, so a blocked GSAP must not blank the page.
- Sticky stacks: both the industries and services rows are `position: sticky` and pin as
  you scroll. Each service "Learn more" opens its modal, and Escape returns focus to that
  button (not the row).
- Comparison band: both columns render, the two columns stack below 760px, and the `vs-foot`
  line is the last thing before the inquiry form.
- Nothing is left hidden: after a slow full-page scroll, no element outside `.spec-modal`
  sits below opacity 1 except the intentional ones (`.pulse-indicator`, a disabled
  `.rail-btn`, `.portal-mini-logo`, the hidden radio inputs, `.barcode-stripes`).
- Modal at 740x420 (landscape phone): content fits, `.modal-body` scrolls internally, the
  close button is reachable, and Escape restores focus to the triggering card.
- Form: choose remote/on-site/unsure, submit valid data -> a `mailto:` draft opens and the receipt reads "Draft Ready to
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
