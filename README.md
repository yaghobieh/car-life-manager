# Car Life Manager

Israeli vehicle ownership platform.

**Everything you need for your car. In one place.**

Hebrew, RTL-first dashboard for managing a vehicle after purchase: official lookup, tasks, documents, expenses, reminders, and service connections.

Version **1.0.0**.

## Stack

- Web: Vite + React + [`@forgedevstack/bear`](https://www.npmjs.com/package/@forgedevstack/bear) + [`@forgedevstack/synapse`](https://www.npmjs.com/package/@forgedevstack/synapse) + [`@forgedevstack/lingo`](https://www.npmjs.com/package/@forgedevstack/lingo) + [`@forgedevstack/grid-table`](https://www.npmjs.com/package/@forgedevstack/grid-table)
- API: [`@forgedevstack/harbor`](https://www.npmjs.com/package/@forgedevstack/harbor) + Prisma (SQLite locally, PostgreSQL-ready)
- Domain: `@clm/shared` task engine, plate normalization, expense math

Harbor is the Forge backend framework. Bear is the UI kit. Synapse is app state. Lingo is Hebrew/English copy. Grid Table is used for list pages. See `docs/DECISIONS.md`.

## Run

```bash
cp .env.example apps/api/.env
# DATABASE_URL="file:./dev.db"
npm install
npm run db:generate
npx prisma migrate dev --name init --schema apps/api/prisma/schema.prisma
npm run dev:api
npm run dev:web
```

Open http://127.0.0.1:5188 (API: http://127.0.0.1:4173)

## Tests

```bash
npm test
```

## Official data

Vehicle lookup uses the public Ministry of Transport dataset on [data.gov.il](https://data.gov.il) via CKAN `datastore_search`.

No parking, toll, or insurance account is marked connected unless a real authenticated integration exists. Those providers are currently **not supported**.
