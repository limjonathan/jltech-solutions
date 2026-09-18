# Changelog

All notable changes to the JL Tech Solutions site are documented here.

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
