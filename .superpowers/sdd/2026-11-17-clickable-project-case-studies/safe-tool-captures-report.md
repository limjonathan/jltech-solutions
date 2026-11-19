# Safe Tool Capture Batch Report

Date: 2026-11-18
Viewport: 1440 × 900
Browser: Chromium via Playwright against loopback static servers

## Project documentation read

- Aleph Bet Express: `AGENTS.md`
- Courseware as Code: `AGENTS.md`, `README.md`
- pdfforge: `AGENTS.md`, `README.md`
- RegexScope: `AGENTS.md`, `README.md`

## Captures

| Project | `-02` state | `-03` state |
|---|---|---|
| Aleph Bet Express | Public homepage hero | Services section after the documented “Explore services” link |
| Courseware as Code | Course dashboard | Documented `HTTP Basics` lesson route, scrolled to the quiz content |
| pdfforge | Public tool registry | Public Merge PDF tool landing page; no files selected |
| RegexScope | Offline default ISO-date pattern with synthetic test text and results | Email-address preset with synthetic test text and results |

Files:

- `showcase/assets/aleph-bet-express-02.png`
- `showcase/assets/aleph-bet-express-03.png`
- `showcase/assets/courseware-as-code-02.png`
- `showcase/assets/courseware-as-code-03.png`
- `showcase/assets/pdfforge-02.png`
- `showcase/assets/pdfforge-03.png`
- `showcase/assets/regexscope-02.png`
- `showcase/assets/regexscope-03.png`

All eight files are PNGs at 1440 × 900, nonblank, and distinct within each project.
No credentials, private data, uploads, real documents, form submissions, or source /
repository views were used.

## Catalog and verification

Updated `additionalScreenshots` in `tools/build-showcase-catalog.js`, then regenerated
`showcase/projects.json` and the JavaScript-disabled fallback in `showcase.html`.

Commands:

```text
node tools/build-showcase-catalog.js
node tools/build-showcase-fallback.js
node tools/validate-showcase-catalog.js
node --test tests/*.test.js
```
