# Task 3 report — fallback and real-browser verification

## Status

Complete. The JavaScript-disabled fallback was regenerated from
`showcase/projects.json` and the fallback generator now rejects an invalid catalog
before writing the page.

## Documentation

- `AGENTS.md` documents the 1440x900 Chromium capture workflow, safe-artifact rules,
  clickable gallery behavior, responsive verification, and the AlphaFleet exception.
- `CHANGELOG.md` records the fallback regeneration and browser verification.
- AlphaFleet remains the sole exception: its local project UI is unavailable, so the
  existing poster remains in the catalog. No private or unverified capture was added.

## Automated verification

Commands run from the project root:

```bash
node tools/build-showcase-fallback.js
node tools/validate-showcase-catalog.js
npm test
node --check tools/build-showcase-fallback.js
node --check showcase.js
git diff --check
```

Results:

- Catalog valid: 48 projects and 48 local primary artifacts.
- Test suite: 20 passed, 0 failed.
- Screenshot asset audit: 99 catalog references, 99 unique files present.
- JavaScript syntax and diff checks passed.

## Real-browser verification

The live local page was verified in Chromium at 390px, 768px, and 1440px:

- Opened a project case study.
- Changed the active screenshot thumbnail.
- Closed with Escape and confirmed focus returned to the triggering project.
- Selected the Websites filter, opened AlphaFleet, and advanced to Desh Portfolio
  with Next; both remained inside the filtered category.
- Confirmed no horizontal overflow (`scrollWidth === clientWidth` at each viewport).
- Confirmed no broken images in the rendered page or active gallery.
- Confirmed zero console errors and zero page errors.

The project server and temporary preview servers used during verification were stopped
after the checks. The unrelated TilMar preview on port 8080 was left untouched.
