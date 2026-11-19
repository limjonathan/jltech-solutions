# Task 2 Report: Interactive case-study panel and gallery

## Status

Implemented and committed as `917f575` (`feat: add interactive showcase case studies`).

## Files changed

- `showcase.html`
  - Marked the dynamic case-study surface as an accessible dialog panel.
  - Bumped the showcase script cache version.
- `showcase.js`
  - Added hash-opened case-study panel controls.
  - Added focus-preserving card activation and Escape/close behavior.
  - Added screenshot gallery using `[project.artifact, ...(project.screenshots || [])]`.
  - Added accessible thumbnail buttons and active-image state.
  - Added previous/next navigation over the active filtered project list.
  - Added feature chips, problem, outcome, and build-summary sections.
  - Added an optional HTTPS-only public demo CTA with private/local URL rejection.
  - Kept source paths, repository links, credentials, and private endpoints out of rendered content.
- `showcase.css`
  - Added panel controls, gallery, thumbnails, chips, navigation, CTA, and mobile layout styles.
  - Added reduced-motion transition behavior and mobile overflow protections.
- `tests/showcase-index.test.js`
  - Added static coverage for dialog controls, filtered navigation, gallery fallback, and demo URL safety.

## Tests and output

Command:

```text
node --check showcase.js && git diff --check && npm test
```

Result:

```text
ℹ tests 18
ℹ pass 18
ℹ fail 0
```

## Browser verification

Verified against `http://localhost:8005/showcase.html` in Chrome:

- Desktop index rendered all 48 project cards with no horizontal overflow.
- Opening a card changed the hash without reloading the page and rendered the dialog panel.
- Aleph Bet Express rendered all 3 normalized gallery images.
- Thumbnail 2 changed the primary image and `aria-current` state.
- Filtered Applications navigation moved from Aleph Bet Express to Boardly Workspace, staying within the filtered list.
- Escape and the close button closed the panel and restored focus to the activating card.
- Accessibility tree exposed the case-study surface as a dialog with named close, thumbnail, and navigation controls.
- Mobile viewport at 390px rendered the panel/gallery with no horizontal overflow.
- Reduced-motion emulation reported a collapsed project-card transition (`0.00001s`) and no overflow.
- Browser console/page errors: zero observed.

## Concerns

- The current catalog has no `demoUrl` values, so the optional demo CTA is implemented but not rendered by present entries.
- The case-study panel uses the existing in-page hash surface rather than a native `<dialog>`, preserving the static fallback and existing URL behavior.
- The requested report is intentionally left outside the Task 2 commit because the commit is scoped to the four brief-listed implementation/test files.

## Fix round

### Reviewer findings addressed

- Aligned the client-side demo CTA URL guard with the hardened catalog validator:
  blocked IPv4 special-use ranges, IPv6 ULA/link-local/multicast/loopback/unspecified
  ranges, IPv4-mapped IPv6 targets, local naming suffixes, credentials, ports, and
  malformed values.
- Added modal background inerting plus `aria-hidden` restoration and a Tab/Shift+Tab
  focus trap. Escape and activating-card focus restoration remain intact.
- Filter changes now re-render an open case study when the selected project remains in
  the filtered set, or safely close and clear the hash when it is filtered out.
- Added runtime URL-guard coverage using the showcase script in a VM harness, alongside
  interaction-contract assertions for focus trapping and filtered navigation.

### Verification

```text
node --check showcase.js
git diff --check
npm test
```

Result: 20 tests passed, 0 failed.

Browser verification against the existing local server at
`http://localhost:8005/showcase.html`:

- 48 cards rendered with no horizontal overflow and no console/page errors.
- Opening a case study inerted and `aria-hidden`-marked the background; Tab wrapped
  within modal controls; Escape closed and restored focus to the activating card.
- Filtering while a case study was open cleared the stale hash and showed the filtered
  index when the project was excluded (`13 projects` in Websites).
- A project without additional screenshots rendered the primary artifact as its sole
  gallery thumbnail.
