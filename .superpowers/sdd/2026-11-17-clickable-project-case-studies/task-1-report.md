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

## Fix round 1 — 2026-11-17

### Changes

- Hardened demo URL validation with `net.isIP()` and canonical hostname normalization,
  including trailing-dot hostnames.
- Normalized IPv4-mapped IPv6 addresses before applying IPv4 loopback, private,
  link-local, multicast, unspecified, benchmark, documentation, and reserved-range
  checks.
- Added IPv6 checks for loopback, unspecified, unique-local, link-local, multicast,
  documentation, benchmarking, Teredo/ORCHID, and reserved ranges.
- Added positive coverage proving an existing screenshot path and safe public HTTPS URL
  are accepted.
- Added regression coverage for IPv4-mapped IPv6 and dotted/trailing-dot local endpoints.

### Verification

```text
node --test tests/showcase-catalog.test.js
7 tests, 7 passed, 0 failed

node tools/build-showcase-catalog.js
completed successfully

node tools/validate-showcase-catalog.js
Showcase catalog valid: 48 projects, 48 local artifacts.

node --test tests/*.test.js
15 tests, 15 passed, 0 failed
```

### Concerns

- No catalog entries were populated with unverified screenshots or demo URLs.
- Pre-existing unrelated worktree changes and untracked capture assets were left untouched.
