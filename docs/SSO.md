# SSO and the database

SSO is not a database. Google / Apple / email login is an **identity provider**. The app still needs one SQL database to keep the signed-in user and all car data.

## Create this database

Create **PostgreSQL**. That is the production database for CLM.

Good hosted options:

| Service | Why |
| --- | --- |
| **Supabase** | Postgres plus built-in Google/Apple Auth. Fastest way to get SSO and keep data in one place. |
| **Neon** | Serverless Postgres. Pair with Auth.js / Forge auth for Google and Apple. |
| **Amazon RDS / Cloud SQL** | When you already run on AWS / GCP. |

Local development stays **SQLite** (`file:./dev.db`). Do not use Mongo for app data.

## What Prisma already stores

- `User` — email, name, image, verified-at
- `AuthIdentity` — `provider` + `providerAccountId` (Google `sub`, Apple `sub`)
- `AuthSession` — server session token and expiry
- `ProviderConnection` — Pango / Highway 6 / Cello later, still `not_supported`
- Vehicles, tasks, expenses, reminders — the product data

Point production `DATABASE_URL` at the Postgres URL, then run Prisma migrate. Cookie-only anonymous users stay for local until the identity provider is wired.
