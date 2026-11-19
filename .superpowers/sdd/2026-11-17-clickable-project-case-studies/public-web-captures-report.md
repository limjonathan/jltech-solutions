# Public Web Capture Report

Date: 2026-11-18
Viewport: 1440 × 900
Browser: Chromium via Playwright

## Captured

- `street-eats-food-truck`
  - `street-eats-food-truck-02.png`: public hero state.
  - `street-eats-food-truck-03.png`: menu section with the Mains filter selected.
- `pmc-website`
  - `pmc-website-02.png`: public hero state.
  - `pmc-website-03.png`: services section.
- `sunrisesite`
  - `sunrisesite-02.png`: public hero state.
  - `sunrisesite-03.png`: menu section with the second menu category selected.
- `superasianwok`
  - `superasianwok-02.png`: public hero state.
  - `superasianwok-03.png`: menu section with Entrees selected.
- `nomu`
  - `nomu-02.png`: public hero state.
  - `nomu-03.png`: Full Menu section.

All 10 PNGs are 1440 × 900, nonblank, and pairwise distinct within each project.

## Skipped

None. All five requested public projects produced two additional captures.

## Verification

- Local static servers returned HTTP 200 for all five projects.
- Browser captures completed without console or page errors.
- `node tools/validate-showcase-catalog.js` passed: 48 projects, 48 local artifacts.
- `node --test tests/*.test.js` passed: 15 tests.

The four target projects without an `AGENTS.md` were checked and recorded as absent:
`street-eats-food-truck`, `pmc-website`, `sunrisesite`, and `nomusite`; `superasianwok`
had both README and AGENTS. No forms,
orders, credentials, private data, repository views, or fabricated images were used.
