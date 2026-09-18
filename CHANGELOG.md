# Changelog

All notable changes to the JL Tech Solutions site are documented here.

## 2026-09-18 - Visual and motion rebuild, Phase A+B

First half of a two-part rebuild: foundations plus the motion system, header and hero.
Phases C-F (section recomposition, generated imagery, full gate) are still to come.

### Typography and token layer

- Replaced **Inter** with **Geist** (Google Fonts, OFL) and kept JetBrains Mono for the
  ops/terminal layer. Inter is the single most common AI-default sans; Geist is a
  geometric Swiss-rooted face that suits an infrastructure brand better.
- Added a `clamp()`-based type scale so headings stop being pinned to fixed rem values at
  each breakpoint, and switched display sizes to tighter tracking. The hero headline
  carries `text-wrap: balance`.
- Consolidated four ad-hoc corner radii (6/10/16/24px) onto a documented three-step scale
  and aliased `--radius-xl` to it so the old value cannot creep back.
- Shadows are now tinted to the background hue (slate) instead of pure black.
- Collapsed the palette onto **one accent**. `--color-secondary` is gone; the gradient is
  now two stops of the same hue (different lightness), which is not a second accent.
- Added a motion token vocabulary (`--ease-out`, `--ease-in-out`, `--ease-spring`,
  `--dur-press/ui/surface`) and folded the old `--transition` / `--transition-fast` onto
  it so no rule can invent its own curve.

### Removed templated tells

- **96 em-dashes purged** from the copy (meta, OG, JSON-LD, prose and code comments).
  The glossary lists in the nine service modals now use a colon, which is the correct
  punctuation for a term/definition pair.
- Section eyebrows cut from **6 to 0**. Each h2 already carried the meaning, and an
  uppercase tracked micro-label above every section is the classic templated pattern.
  Two micro-labels remain (the hero status pill and the form badge) against a budget of 3.
- Duplicate-intent CTAs consolidated: "Get Started", "Get a Quote", "Request AI Services"
  and "Start a Project" are now one label, **"Start a project"**, used identically in the
  nav, hero, engagement cards and footer.
- Hero subtitle trimmed from 35 words to 17, and the headline reduced to a 2-line shape
  (both are pre-flight limits).
- Removed the hero scroll cue ("Scroll to explore" style affordance) and the three generic
  section-wave dividers.
- All 18 hand-drawn icon paths and the remaining emoji replaced with **Tabler** icons
  (via the Iconify API), inlined at a consistent 1.75 stroke weight.
- `100vh` replaced with `100dvh` for the modal shell and mobile drawer.
- Removed the four inline `onerror` handlers on the logo images; a failed logo now shows
  its alt text instead of silently collapsing, and the page has no inline JS left.

### Motion system (new `motion.js`)

- All timelines live in one `gsap.matchMedia()` block so responsive and reduced-motion
  variants cannot drift apart. GSAP 3.15 is **vendored** into `vendor/gsap/` (core,
  ScrollTrigger, SplitText, DrawSVG) rather than CDN-loaded: no third-party runtime
  dependency, no SRI upkeep, deterministic at deploy.
- Hero: SplitText line-mask reveal, staggered entrance for the eyebrow/subtitle/CTAs and
  the visual panel, pointer parallax on a fine pointer only, and a scroll-scrubbed exit.
- Scroll progress rail and the condensed header are driven by ScrollTrigger, replacing the
  `window.addEventListener('scroll')` handler that was the last banned pattern in the code.
- Nav marks the current section via IntersectionObserver.
- Section grids reveal on entry with a 60ms stagger.

### Animated background (new `background.js`)

- Live topology canvas behind the hero: drifting nodes with proximity links and a gentle
  pointer repulsion. It is DPR-capped at 2, node-capped for perf, and the rAF loop stops
  the moment the hero scrolls out of view or the tab is hidden.
- A fixed aurora field and a masked grid sit behind the content; the hero and industries
  sections are transparent so the field reads at the top of the page.
- A tiled noise overlay on a fixed, `pointer-events: none` pseudo-element only (never on a
  scrolling container, which would force continuous repaints).

### Fixed along the way

- **Scroll progress bar never moved**: it shipped at `width: 0%` and animated `scaleX` to a
  value it already had, so it was permanently full. Now `width: 100%` with
  `transform: scaleX(0)` and a `fromTo` tween.
- **Hero aurora ignored reduced motion.** The override lost on source order to the base
  rule. It is now declared inside `@media (prefers-reduced-motion: no-preference)`.
- **`.pulse-indicator` lost its rule** when the old hero block was replaced, leaving an
  invisible status dot. Restored.
- **The hero scrub faded the CTA below contrast.** Removed opacity from that tween: the
  scrub now translates only, so the button stays above 4.5:1 at every scroll position.
- Reveal ownership moved out of `app.js` into `motion.js`; `app.js` no longer observes
  anything, so there is exactly one source of motion truth.

### Verified

- axe: **zero violations** on desktop and mobile, at rest and mid-scroll, across all
  severity states, the receipt and all four log levels.
- LCP 716ms cold / 112ms warm (budget 2500ms), **CLS 0.0005** cold and 0 warm (budget 0.1).
- Reduced motion: no element below opacity 1, every CSS animation inert, canvas draws one
  static frame.
- JS disabled: hero and all sections render fully visible.
- Zero horizontal overflow and no scroll-arrow/CTA overlap from 320px to 1920px.
- Modal still fits 740x420 with internal scroll and restores focus on Escape; the form
  still emits a real `mailto:` and never claims undelivered success.

### Files

- Added: `motion.js`, `background.js`, `vendor/gsap/*`, `assets/grain.png`
- Changed: `index.html`, `style.css`, `app.js`, `AGENTS.md`

## 2026-09-17 — Audit fixes: form delivery, logo proportionality, SEO, accessibility

Full audit of the live site (Published Pages URL, `main` branch root). Findings and fixes
below; every item was reproduced before being changed and re-tested after.

### Fixed — the inquiry form silently discarded every submission

The form had no `action`/`method` and `app.js` only played an animation before showing a
receipt that claimed the inquiry had been logged and a confirmation email sent. Verified on
the live site: submitting produced **zero network requests**, so real inquiries were lost.

- Added `FORM_ENDPOINT` (empty by default) plus a `mailto:` fallback. With the endpoint
  empty the form now opens a prefilled draft (`subject` = service + org, `body` = all
  fields) so the inquiry actually reaches the contact address.
- The POST path (used once `FORM_ENDPOINT` is set) renders the receipt **only on a 2xx**
  and shows an inline error with a `mailto:` link on failure.
- Receipt copy is now truthful: "Draft Ready to Send" + "press Send to reach us" for the
  mailto path, "Inquiry Submitted" only after a real 2xx. Removed the false
  "Confirmation email will be sent within moments." line.
- Added a hidden honeypot field; submissions that fill it are ignored.
- Ticket year is derived from `new Date()` instead of hardcoded `2026`.

### Fixed — security

- **DOM XSS**: `addLogEntry` built log rows with `innerHTML`, and the Company field was
  interpolated into it. A payload in the Company field parsed as HTML and executed.
  Rewritten with `createElement` + `textContent` (same for `showFormError`).
- `CONTACT_USER`/`CONTACT_DOMAIN` are joined at runtime so the literal address is not in
  the served HTML.
- Remote URL in `.git/config` carried a GitHub PAT; switched to a token-free URL and the
  PAT should be revoked. No secret was ever committed (verified across all refs).

### Fixed — logo was not proportional

`assets/logo.svg` was a 3125×3125 canvas whose artwork occupied only the central 42%
(29% transparent padding on every side), so a `height:103px` box rendered a ~42px mark and
20–23px on mobile. Three negative-margin hacks only masked it and the box overflowed the
header at 500–768px.

- Cropped to `viewBox="890 910 1340 1300"` (artwork now fills 98.3% × 98.4%, aspect
  preserved at 1.030).
- Removed all `margin:-42px/-16px/-10px` and per-breakpoint height overrides.
- Header logo 44px (40/38px on smaller screens), footer 120px, portal 56px.
- Added `assets/logo-light.svg` (grey `#4D4D4D` → `#E2E8F0`, red kept) and dropped the
  `filter: brightness(2.5)` hack that left the footer logo washed out.

### Fixed — SEO / domain

- Canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD `url`/`logo` and the
  `robots.txt` sitemap all pointed at `https://jltech.com` — which resolves to a
  **different company** (Janus Logistics Technologies). Repointed to the Pages URL.
- `og:image` was an SVG, which Facebook/X/LinkedIn/WhatsApp do not render. Replaced with a
  generated `assets/og-cover.png` (1200×630) and added `og:image:width/height`.
- Added the missing `sitemap.xml` (the robots entry previously 404'd).

### Fixed — layout, animation, accessibility

- **Hero scroll arrow overlapped the "Explore Services" button at every width ≤480px.**
  Below 480px it is now in normal flow instead of absolutely positioned.
- **Hero blobs animated once then froze** — the `animation` shorthand reset the
  `infinite alternate` values from the base rule. All three now animate continuously.
- **Contrast (axe `serious`)**: `#2563eb` on `#dbeafe` was 4.24:1. Added text-safe status
  variables (`--color-accent-text`, `--color-alert-text`, `--color-warning-text`), used
  `--color-primary-dark` for text on light blue, and fixed the ops-log tags, log
  timestamps, ticket strip, severity labels and receipt severity colours. axe is now clean
  on desktop + mobile across default, all three severity states, the receipt and all log
  levels. (The earlier `.reveal` transition had been hiding these from the audit.)
- **Landscape-phone modal trapped users**: `.modal-content` had no max-height and
  `body{overflow:hidden}` blocked scrolling, leaving content and the close button
  off-screen. Now `max-height: min(85vh, 640px)` with `.modal-body` scrolling internally.
- Modals restore focus to the triggering card on close; service cards are
  `role="button"` + `tabindex="0"` with Enter/Space handling.
- Ops log is keyboard-scrollable (`tabindex="0"` + `aria-label`).
- Added `<main id="main-content">` (replacing an empty div used as the skip target).
- Fixed heading order (promoted six `h4`s that followed an `h2`).
- Replaced all emoji icons with inline SVGs matching the service-card icon language.
- Added `autocomplete` to the form inputs; phone field is now `type="tel"`.
- Scroll-reveal is skipped entirely when `IntersectionObserver` is unavailable.

### Fixed — reset left the form in a lying state

`btn-reset-form` called `form.reset()` without clearing the stale `.is-checked` class, so
after submitting "Urgent" and resetting **both** "Standard" and "Urgent" rendered
highlighted while the real value was Standard. Reset now re-syncs the severity classes.

### Fixed — dev server

- Query strings broke asset resolution (`/style.css?v=2` 404'd) because the path was not
  stripped of the query/fragment.
- Assets were served `Cache-Control: max-age=2592000` (30 days) including HTML, so deploys
  served stale CSS/JS. HTML is now `no-store`; other assets `max-age=3600`.

### Added

- `AGENTS.md` with architecture notes and the invariants above.
- `CHANGELOG.md` (this file).
- `.gitignore` entries for browser-audit artifacts, AI index outputs and the unused
  `assets/logo.jpg`.
