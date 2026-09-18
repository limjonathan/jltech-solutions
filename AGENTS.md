# AGENTS.md — JL Tech Solutions

Corporate single-page site for **JL Tech Solutions** (IT infrastructure / SecOps).
Live: <https://limjonathan.github.io/jltech-solutions/>

## Stack

- Static HTML + CSS + vanilla JS. No build step, no framework, no dependencies.
- Google Fonts (Inter, JetBrains Mono) loaded from the CDN.
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
index.html      Single page: hero, industries, 9 services (+9 modals), AI section,
                engagement models, ops dashboard, about, inquiry form, footer
style.css       Design system + responsive breakpoints (1100 / 1024 / 768 / 480)
app.js          Interactivity: nav, modals, ops log, telemetry, inquiry form
server.js       Dev-only static server (rate limiting, security headers, caching)
sitemap.xml     Single-URL sitemap
robots.txt      Crawl rules -> sitemap
assets/
  logo.svg          Primary logo (viewBox cropped tight to the artwork)
  logo-light.svg    Light variant (#4D4D4D -> #E2E8F0) for dark backgrounds
  og-cover.png      1200x630 social card
  logo.png          3125x3125 RGBA source raster (padding NOT trimmed; source only)
  logo.jpg          Unused, gitignored
```

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
- Header: logo sits fully inside the bar at 320–1440px; no horizontal scroll.
- Modal at 740×420 (landscape phone): content fits, `.modal-body` scrolls, close button
  reachable, Escape restores focus to the card.
- Form: submit valid data -> a `mailto:` draft opens and the receipt reads
  "Draft Ready to Send". Then Reset -> exactly one severity option highlighted.
- Accessibility: run axe (`color-contrast`, `landmark-one-main`, `region`,
  `heading-order`, `scrollable-region-focusable`) with reveal transitions disabled —
  forcing `.revealed` mid-transition yields false contrast positives.

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
