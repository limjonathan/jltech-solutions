# Portfolio capture batch report

Date: 2026-11-18

## Scope and capture method

Captured two additional public visual states for each requested static portfolio
project with Chromium at a consistent 1440x900 viewport. Captures used the public
homepage and a meaningful lower-page scroll state; no forms were submitted and no
credentials, private data, repository pages, source-code views, or client documents
were accessed.

## Project documentation read

- Desh Portfolio: no README.md or AGENTS.md present
- Dylan Hardy Portfolio: AGENTS.md
- Emily Lim Portfolio: AGENTS.md
- Icha Frida Portfolio: README.md
- John Portfolio: no README.md or AGENTS.md present

## Captures

| Project | `-02` state | `-03` state | Files |
|---|---|---|---|
| Desh Portfolio | Hero | Experience section | `deshportfolio-02.png`, `deshportfolio-03.png` |
| Dylan Hardy Portfolio | Hero | Featured work section | `dylan-portfolio-02.png`, `dylan-portfolio-03.png` |
| Emily Lim Portfolio | Hero | Experience section | `emily-portfolio-02.png`, `emily-portfolio-03.png` |
| Icha Frida Portfolio | Hero | Experience timeline | `icha-portfolio-02.png`, `icha-portfolio-03.png` |
| John Portfolio | Hero | Scrolled technical blueprint / operations content | `john-portfolio-02.png`, `john-portfolio-03.png` |

All ten images are real RGB PNGs at 1440x900 and were checked for nonblank pixel
ranges. The John Portfolio build was served from its `dist/` output under its
expected `/Johnport/` base path so its public assets loaded correctly; no source
files were changed.

## Catalog and verification

Registered all ten files in `tools/build-showcase-catalog.js`, then regenerated
`showcase/projects.json` and `showcase.html`.
