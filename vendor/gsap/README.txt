GSAP 3.15.0 — vendored, not npm-managed
========================================

Files in this directory are the unmodified minified distributions from
gsap@3.15.0 (https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/):

  gsap.min.js             GSAP core
  ScrollTrigger.min.js    scroll-scrubbed timelines / pinning
  SplitText.min.js        per-line / per-word text splitting
  DrawSVGPlugin.min.js    SVG stroke-dashoffset line drawing

License
-------
Standard "no charge" license — https://gsap.com/standard-license

Since 30 April 2025 (Webflow's acquisition of GreenSock) GSAP is 100% free,
including the plugins that were formerly members-only (SplitText, MorphSVG,
DrawSVG, ScrollSmoother and the rest). Commercial use is permitted at no cost.
The header comment in each file carries the license pointer.

Why vendored instead of a CDN
-----------------------------
A live CDN call is a third-party runtime dependency on every page load and
would need SRI hashes maintained on every version bump. Vendoring keeps the
site self-contained, deterministic at deploy time, and working offline, which
is the same reason the project has no build step.

Updating
--------
Re-download all four files at the new version, bump the version string here,
then re-run the Phase B verification gate (see AGENTS.md) — ScrollTrigger
regressions show up as pinned-element jump or scroll-jank, not as errors.

Do not edit these files. Any customisation belongs in motion.js.
