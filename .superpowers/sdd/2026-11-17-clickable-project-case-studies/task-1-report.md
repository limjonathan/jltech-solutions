# Task 1 implementation report

## Changes

- Extended `tools/build-showcase-catalog.js` with optional `screenshots` and `demoUrl`
  metadata maps. Existing primary capture mappings remain unchanged; projects without
  verified additional captures continue to emit only `artifact`.
- Extended `tools/validate-showcase-catalog.js` with reusable project validation:
  optional screenshots must be safe, existing paths under `showcase/assets`, and
  optional demo URLs must be HTTPS URLs without credentials or private/local hosts.
- Kept `showcase/projects.json` on the existing primary-artifact-only contract because
  no additional screenshot or public demo URL was verified for this task.
- Added regression tests for one-image fallback, unsafe screenshot paths, and HTTP/local/
  private demo URLs.
- Added the required project changelog entry.

## Verification

Commands run:

```text
node --test tests/showcase-catalog.test.js
6 tests, 6 passed, 0 failed

node tools/validate-showcase-catalog.js
Showcase catalog valid: 48 projects, 48 local artifacts.

node --test tests/*.test.js
14 tests, 14 passed, 0 failed

node tools/build-showcase-catalog.js
completed successfully
```

## Concerns

- The catalog currently has no verified additional screenshot arrays or public demo URLs,
  so the optional fields are supported and validated but not populated.
- The worktree contained pre-existing capture mappings and untracked capture assets; they
  were preserved and not regenerated or removed.
