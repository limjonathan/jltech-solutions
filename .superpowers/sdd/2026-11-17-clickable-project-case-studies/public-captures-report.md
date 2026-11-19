# Public capture report

Date: 2026-11-18

## Scope and privacy decisions

This slice added only verified public-facing local-browser captures. Chromium was used
against the local JL Tech Solutions static server at a consistent 1440x900 viewport.
No forms were submitted, no credentials or private data were accessed, and no source
code, repository, terminal, or client-document views were captured. The existing
primary artifacts for all other projects were left unchanged.

## Project docs read before capture

- `AGENTS.md`
- `README.md`
- `CHANGELOG.md`

These were read from `/home/saitama/Projects/web/own/jltech` before opening the local
browser capture session. The capture stayed on the public homepage and its public
service detail UI.

## Captures made

| Project | File | State verified |
|---|---|---|
| JL Tech Solutions | `showcase/assets/jltech-solutions-02.png` | Homepage hero at 1440x900 |
| JL Tech Solutions | `showcase/assets/jltech-solutions-03.png` | Services section at 1440x900 |
| JL Tech Solutions | `showcase/assets/jltech-solutions-04.png` | Public “Managed IT Services” detail modal at 1440x900 |

All three files are nonblank RGB PNGs at 1440x900. Browser verification reported zero
console errors and zero page errors.

## Skipped projects

The following projects were not changed in this first JL Tech screenshot slice. No
additional public local-browser state was verified for them, so no speculative or
unverified screenshots were added:

- Aleph Bet Express
- Desh Portfolio
- Dylan Hardy Portfolio
- Emily Lim Portfolio
- Icha Frida Portfolio
- Jonathan Lim Portfolio
- John Portfolio
- NoMu Studio
- Street Eats Food Truck
- PMC Website
- Sunrise Site
- Super Asian Wok
- Courseware as Code
- PDF Forge
- RegexScope

The existing primary captures remain the only catalog artifacts for these entries.

## Catalog and tests

Updated `additionalScreenshots` in `tools/build-showcase-catalog.js`, then regenerated
`showcase/projects.json` and the JavaScript-disabled fallback in `showcase.html`.

Commands:

```text
node tools/build-showcase-catalog.js
node tools/build-showcase-fallback.js
node tools/validate-showcase-catalog.js
Showcase catalog valid: 48 projects, 48 local artifacts.

node --test tests/*.test.js
15 tests, 15 passed, 0 failed

node --check tools/build-showcase-catalog.js
node --check tools/build-showcase-fallback.js
completed successfully
```
