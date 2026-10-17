# Car Life Manager

Israeli vehicle ownership platform.

**Everything you need for your car. In one place.**

Hebrew, RTL-first dashboard for managing a vehicle after purchase: official lookup, tasks, documents, expenses, reminders, and service connections.

Version **1.0.2**. Gmail setup: `docs/GMAIL.md`. Notifications and calendar: `docs/NOTIFICATIONS.md`. Vercel: `docs/VERCEL.md`.

## Stack

- Web: Vite + React + [`@forgedevstack/bear`](https://www.npmjs.com/package/@forgedevstack/bear) + [`@forgedevstack/synapse`](https://www.npmjs.com/package/@forgedevstack/synapse) + [`@forgedevstack/lingo`](https://www.npmjs.com/package/@forgedevstack/lingo) + [`@forgedevstack/grid-table`](https://www.npmjs.com/package/@forgedevstack/grid-table)
- API: [`@forgedevstack/harbor`](https://www.npmjs.com/package/@forgedevstack/harbor) + Prisma + PostgreSQL
- Domain: `@clm/shared` task engine, plate normalization, expense math

Harbor is the Forge backend framework. Bear is the UI kit. Synapse is app state. Lingo is Hebrew/English copy. Grid Table is used for list pages. See `docs/DECISIONS.md`.

## Run

```bash
docker compose up -d
cp .env.example apps/api/.env
npm install
npm run db:generate
npm run db:migrate
npm run dev:api
npm run dev:web
```

Open http://127.0.0.1:5188 (API: http://127.0.0.1:4173)

## Database

Prisma is the TypeScript client (ORM). It is not the database.

The database is **PostgreSQL on Neon**. Set `DATABASE_URL` (pooler) and `DATABASE_DIRECT_URL` (direct) in `apps/api/.env`, then run `npm run db:migrate`.

Users must sign in with email/password or Google. Logs print in development, or after `window.enableLogs()` in the browser. Versions are on `window.CLM.version` (`frontend`, `backend`, `build`).

`apps/api/src/integrations` are adapters to external APIs, not microservices.

## Vercel

This is an npm workspaces monorepo. **Root Directory must be empty** (the repo root), not `apps/web` or `apps/api`. Production branch is `main`.

If Root Directory is `apps/api`, `npm install` only gets API packages. The web `tsc` then fails with missing `@forgedevstack/bear`, `react-router-dom`, and `react/jsx-runtime`.

### One project (recommended)

Create/use a Vite project on the repo root. Root `vercel.json` installs workspaces, builds `@clm/web`, and serves Harbor at `/api` and `/health`.

Add these environment variables in Vercel:

- `DATABASE_URL` — Neon pooled URL
- `DATABASE_DIRECT_URL` — Neon direct URL
- `AUTH_SECRET`
- `WEB_ORIGIN` — the Vercel app URL
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI` — must match Google Cloud exactly, e.g. `https://car-life-manager-api.vercel.app/api/auth/google/callback`

### Two projects

- **Web:** Root Directory empty, uses root `vercel.json`.
- **API (`car-life-manager-api`):** Root Directory `apps/api`, uses `apps/api/vercel.json`. That file installs from the repo root and **does not** typecheck the web app.

## Tests

```bash
npm test
```

## Official data

Vehicle lookup and open safety recalls use public Ministry of Transport datasets on [data.gov.il](https://data.gov.il) via CKAN `datastore_search`. Make and model are the official Hebrew names (`tozeret_nm`, `kinuy_mishari`).

No parking, toll, or insurance account is marked connected unless a real authenticated integration exists. Those providers are currently **not supported**.
