# Architecture

```
apps/web     Vite React (Bear, Grid Table, Clm RTL shell)
apps/api     Express HTTP + Prisma persistence
packages/shared   Domain types, plate rules, task engine, expense math
```

The web app talks to `/api` (Vite proxy in development).

## Product routes (Sprint 0.2)

| Path | Who |
| --- | --- |
| `/` | Platform landing. Shared auth. No product dashboard. |
| `/auth` | Email/password + Google. `?next=` must be `/car` or `/property` (or a child). |
| `/car` | Car Manager behind `Gate` + `AppShell` |
| `/car/onboarding` | First vehicle |
| `/property` | Property Manager behind `PropertyGate` + `PropertyShell` |
| `/welcome`, `/vehicles`, … | Redirect to the new paths |

Signed-out `/car` or `/property` goes to `/auth?next=…`. After login, a car `next` with zero vehicles goes to `/car/onboarding`. Missing or unsafe `next` goes to `/`.

State is Synapse, not Redux. Chrome is `clm.css` + `Clm-*`, not Tailwind and not Harbor-as-UI.

Authorization is session-cookie scoped: every vehicle query is filtered by `userId`. Vehicle IDs from the client are never trusted without that check.

Integrations live under `apps/api/src/integrations/*` and map into shared domain types. Provider-specific payloads do not leak to the UI.
