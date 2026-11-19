# Synthetic app captures report

Date: 2026-11-18

## Capture policy

- All screenshots were taken in real Chromium at 1440x900.
- Inputs, accounts, organizations, proposals, and vault notes were synthetic.
- No credentials, client documents, private endpoints, or real tenant records were
  used or published.
- Temporary servers bound to loopback-only ports and were stopped after capture.

## Projects

### GigTax

Docs read before each capture:

- `~/Projects/web/tool/gigtax/AGENTS.md`
- `~/Projects/web/tool/gigtax/README.md` — missing in the target repository
- this project's `AGENTS.md` and `README.md`

Commands/state:

- Started the documented Next dev server with `PORT=3001 npm run dev`.
- Captured the documented free calculator routes:
  - `/calculators/rideshare-tax-calculator` with the built-in example state
  - `/calculators/quarterly-tax-calculator` with the built-in example state
- No account or dashboard route was opened.

Artifacts:

- `showcase/assets/gig-tax-02.png`
- `showcase/assets/gig-tax-03.png`

### ComplyBase

Docs read before each capture:

- `~/Projects/web/tool/complybase/AGENTS.md`
- `~/Projects/web/tool/complybase/README.md` — missing in the target repository
- this project's `AGENTS.md` and `README.md`

Commands/state:

- Started an ephemeral loopback Postgres container on port 55433.
- Ran the documented migration and idempotent framework seed commands using the
  ephemeral database.
- Started Next dev on port 3002 with synthetic-only environment values.
- Created `synthetic-capture-20261118@example.invalid` and `Synthetic Demo Clinic`,
  then activated the seeded SOC 2 framework.
- Captured onboarding, framework catalog, controls checklist, and trust-center
  states.

Artifacts:

- `showcase/assets/complybase-02.png`
- `showcase/assets/complybase-03.png`
- `showcase/assets/complybase-04.png`
- `showcase/assets/complybase-05.png`

### PitchKit

Docs read before each capture:

- `~/Projects/web/own/pitchkit/AGENTS.md`
- `~/Projects/web/own/pitchkit/README.md`
- this project's `AGENTS.md` and `README.md`

Commands/state:

- Started an ephemeral loopback Postgres container on port 55434.
- Ran the documented `db:push`, template seed, and `scripts/demo-proposal.ts`
  commands against that database.
- Started Next dev on port 3003 with `DEV_LOGIN=1` and synthetic-only environment
  values.
- Used the documented demo proposal path and captured dashboard, new-proposal form,
  and the synthetic public preview. The preview token is intentionally omitted from
  this report.
- No Claude or Stripe credentials were configured or used.

Artifacts:

- `showcase/assets/pitchkit-02.png`
- `showcase/assets/pitchkit-03.png`
- `showcase/assets/pitchkit-04.png`

### WikLite

Docs read before each capture:

- `~/Projects/web/own/wiklite/AGENTS.md`
- `~/Projects/web/own/wiklite/README.md`
- this project's `AGENTS.md` and `README.md`

Commands/state:

- Built the documented core/server/web artifacts with the repository's local
  TypeScript and Vite binaries.
- Started the documented server CLI on port 8081 against a temporary vault under
  `/tmp/opencode/wiklite-vault`.
- The vault contained only three synthetic notes: `Launch Plan`, `Product Brief`,
  and `Research Notes`, with wikilinks between them.
- Captured editor/backlinks, command-palette search, and graph states.

Artifacts:

- `showcase/assets/wiklite-02.png`
- `showcase/assets/wiklite-03.png`
- `showcase/assets/wiklite-04.png`
- `showcase/assets/wiklite-05.png`

## Skipped reasons

- No documented calculator/dashboard or authenticated GigTax state was captured.
- No real tenant, customer, or production trust-center state was used for ComplyBase.
- No AI-generated PitchKit section was requested or attempted because the documented
  demo path does not require an Anthropic key.
- The first WikLite Vite invocation from the monorepo root was skipped after it
  reported the expected missing root `index.html`; the documented package-local
  build then succeeded.
