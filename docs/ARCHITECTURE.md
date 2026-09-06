# Architecture

```
apps/web     Vite React (Bear, Grid Table, RTL shell)
apps/api     Harbor HTTP + Prisma persistence
packages/shared   Domain types, plate rules, task engine, expense math
```

The web app talks to `/api` (Vite proxy in development).

Authorization is session-cookie scoped: every vehicle query is filtered by `userId`. Vehicle IDs from the client are never trusted without that check.

Integrations live under `apps/api/src/integrations/*` and map into shared domain types. Provider-specific payloads do not leak to the UI.
