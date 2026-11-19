# Remaining app captures report

Date: 2026-11-19

## Capture policy

- Screenshots were captured in real Chromium at `1440x900`.
- Only loopback development servers were opened.
- No credentials were entered, and no private endpoints, repositories, source
  views, client documents, real people, addresses, jobs, or tenant records were
  captured.
- Primary captures use the stable project slug. Additional captures use the
  `-02` suffix and are registered in `tools/build-showcase-catalog.js`.
- Temporary servers, the isolated browser session, and temporary screenshot
  files were cleaned up after capture.

## Captured

### FieldOps Central

Docs read:

- `/home/saitama/Projects/web/own/fieldops-central/AGENTS.md`
- `/home/saitama/Projects/web/own/fieldops-central/README.md`
- `/home/saitama/Projects/web/own/jltech/AGENTS.md`
- `/home/saitama/Projects/web/own/jltech/README.md`

Routes and privacy decisions:

- `/technician` — documented demo technician workspace with fictional seed data.
- `/manager` — documented manager reporting workspace with fictional seed data.
- The local server already used `AUTH_MODE=demo` and displayed the documented
  fictional-data banner; no mutation was performed.

Artifacts:

- `showcase/assets/fieldops.png`
- `showcase/assets/fieldops-02.png`

### Toolbelt

Docs read:

- `/home/saitama/Projects/web/own/toolbelt/AGENTS.md`
- `/home/saitama/Projects/web/own/toolbelt/README.md`
- `/home/saitama/Projects/web/own/jltech/AGENTS.md`
- `/home/saitama/Projects/web/own/jltech/README.md`

Routes and privacy decisions:

- `/` — public application surface.
- `/login` — public login form; no credentials entered.

Artifacts:

- `showcase/assets/toolbelt.png`
- `showcase/assets/toolbelt-02.png`

### AnswerESG

Docs read:

- `/home/saitama/Projects/web/tool/answer-esg/AGENTS.md`
- `/home/saitama/Projects/web/own/jltech/AGENTS.md`
- `/home/saitama/Projects/web/own/jltech/README.md`

Routes and privacy decisions:

- `/` — public landing page.
- `/login` — public login form; no credentials entered.
- Authenticated dashboard/onboarding data was not accessed because the docs do
  not provide a synthetic account or seed.

Artifacts:

- `showcase/assets/answer-esg.png`
- `showcase/assets/answer-esg-02.png`

### Boardly

Docs read:

- `/home/saitama/Projects/web/own/boardly/AGENTS.md`
- `/home/saitama/Projects/web/own/boardly/README.md`
- `/home/saitama/Projects/web/own/jltech/AGENTS.md`
- `/home/saitama/Projects/web/own/jltech/README.md`

Routes and privacy decisions:

- `/` — public landing page.
- `/sign-in` — public sign-in form; no credentials entered.
- `/player` was not retained because it remained a loading-only state without a
  documented pairing/demo payload.

Artifacts:

- `showcase/assets/boardly.png`
- `showcase/assets/boardly-02.png`

### HomeLoop

Docs read:

- `/home/saitama/Projects/web/own/homeloop/AGENTS.md`
- `/home/saitama/Projects/web/own/jltech/AGENTS.md`
- `/home/saitama/Projects/web/own/jltech/README.md`

Routes and privacy decisions:

- `/` — public landing page.
- `/signup` — public quote/onboarding entry; no personal information entered and
  no checkout was initiated.
- Customer, provider, and admin routes were skipped because no synthetic seed is
  documented.

Artifacts:

- `showcase/assets/homeloop.png`
- `showcase/assets/homeloop-02.png`

### Nursey

Docs read:

- `/home/saitama/Projects/web/own/nursey/AGENTS.md`
- `/home/saitama/Projects/web/own/nursey/README.md`
- `/home/saitama/Projects/web/own/jltech/AGENTS.md`
- `/home/saitama/Projects/web/own/jltech/README.md`

Routes and privacy decisions:

- `/` — public landing page.
- `/login` — public login form; no credentials entered.
- Dashboard and point-of-care routes were skipped because no synthetic tenant is
  documented.

Artifacts:

- `showcase/assets/nursey.png`
- `showcase/assets/nursey-02.png`

### Recoverly

Docs read:

- `/home/saitama/Projects/web/own/recoverly/AGENTS.md`
- `/home/saitama/Projects/web/own/recoverly/README.md`
- `/home/saitama/Projects/web/own/jltech/AGENTS.md`
- `/home/saitama/Projects/web/own/jltech/README.md`

Routes and privacy decisions:

- `/` — public landing page.
- Dashboard and Stripe Connect routes were skipped because no synthetic account
  or seed is documented; no Stripe action was attempted.

Artifact:

- `showcase/assets/recoverly.png`

### SlabDesk

Docs read:

- `/home/saitama/Projects/web/own/slabdesk/AGENTS.md`
- `/home/saitama/Projects/web/own/slabdesk/README.md`
- `/home/saitama/Projects/web/own/jltech/AGENTS.md`
- `/home/saitama/Projects/web/own/jltech/README.md`

Routes and privacy decisions:

- `/` — public landing page.
- `/login` — public login form; no credentials entered.
- Office, field, pilot, and imported-record routes were skipped because the docs
  explicitly identify Til Mar Design as pilot data and prohibit using it for
  public showcase capture.

Artifacts:

- `showcase/assets/slabdesk.png`
- `showcase/assets/slabdesk-02.png`

### Staffy

Docs read:

- `/home/saitama/Projects/web/own/staffy/AGENTS.md`
- `/home/saitama/Projects/web/own/staffy/README.md`
- `/home/saitama/Projects/web/own/jltech/AGENTS.md`
- `/home/saitama/Projects/web/own/jltech/README.md`

Routes and privacy decisions:

- `/` — public landing page.
- Authenticated CRM routes were skipped because the docs provide a dev bypass
  tied to a configured email but do not document a synthetic seeded workspace
  suitable for showcase capture.

Artifact:

- `showcase/assets/staffy.png`

## Skipped

### CareCircle

Docs read:

- `/home/saitama/Projects/web/own/carecircle/AGENTS.md`
- `/home/saitama/Projects/web/own/carecircle/apps/web/AGENTS.md`
- `/home/saitama/Projects/web/own/carecircle/apps/web/README.md`
- `/home/saitama/Projects/web/own/jltech/AGENTS.md`
- `/home/saitama/Projects/web/own/jltech/README.md`

The project documents synthetic dev accounts (`mom@carecircle.dev`,
`daughter@carecircle.dev`, and `caregiver@carecircle.dev`) and the password, but
the local web app requires `NEXT_PUBLIC_SUPABASE_URL` and
`NEXT_PUBLIC_SUPABASE_ANON_KEY`; both documented local env values are empty.
Starting the web app therefore failed closed in the Supabase proxy before a safe
public/login state could render. No external Supabase project was contacted, no
credentials were entered, and no CareCircle screenshot was added. The catalog
keeps the existing public-safe SVG poster for this project.

## Verification notes

- Every retained PNG is non-empty, distinct by SHA-256, and exactly `1440x900`.
- `node tools/build-showcase-catalog.js`
- `node tools/build-showcase-fallback.js`
- `node tools/validate-showcase-catalog.js`
- `node --test tests/*.test.js`
