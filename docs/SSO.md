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

Local development uses the Postgres container in `docker-compose.yml`. Do not use Mongo or treat Prisma as the database.

## What Prisma already stores

- `User` — email, name, image, verified-at
- `AuthIdentity` — `provider` + `providerAccountId` (Google `sub`, Apple `sub`)
- `AuthSession` — server session token and expiry
- `ProviderConnection` — Pango / Highway 6 / Cello later, still `not_supported`
- Vehicles, tasks, expenses, reminders — the product data

Point `DATABASE_URL` at the Neon pooled URL and `DATABASE_DIRECT_URL` at the non-pooler URL, then run `npm run db:migrate`.

Users must sign in. Email + password register/login is live. Google/Gmail is live when `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set. Anonymous cookie users are gone.

Step-by-step Gmail + Vercel redirect setup: `docs/GMAIL.md`.

Clerk is removed. One login serves CarLife and NadLife (same `User` row in Postgres).

Sign-in options:

- Email / password
- Google when `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set
- Auth0 when `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, and `AUTH0_CLIENT_SECRET` are set

Auth0 dashboard: https://manage.auth0.com/ — Allowed Callback URLs must include `{WEB_ORIGIN}/api/auth/auth0/callback` exactly.

`?next=/car` or `?next=/property` is stored for Google and Auth0 so both products return to the site that asked for login.
