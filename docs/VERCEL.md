# Vercel

The site is a Vite frontend plus `/api` serverless functions (`vercel.json`).

## Required env

| Name | Why |
| --- | --- |
| `DATABASE_URL` | Neon pooled Postgres. Include `sslmode=require` |
| `AUTH_SECRET` | Session signing |
| `WEB_ORIGIN` | Your Vercel URL, no trailing slash |

## Recommended env

| Name | Why |
| --- | --- |
| `DATABASE_DIRECT_URL` | Non-pooler URL used for `prisma migrate deploy` during build |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `GOOGLE_REDIRECT_URI` | Gmail button |
| `RESEND_API_KEY` / `NOTIFY_FROM_EMAIL` | Email reminders |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_FROM_NUMBER` | SMS reminders |
| `APP_VERSION` | Shown as `1.0.2` |

## Build

`scripts/vercel-build.sh` now:

1. `prisma generate`
2. `prisma migrate deploy` (uses `DATABASE_DIRECT_URL` when set)
3. Builds the web app and copies it to `apps/api/public`

If `DATABASE_URL` is missing at build time, migrate is skipped and Production will 503 on the first query. Set it before the first deploy after this release so `ServiceConnection` and `Notification` exist.

## After deploy

1. Open `/welcome` then `/auth`
2. Register or use Gmail
3. Add a vehicle
4. Open Reminders and confirm ICS downloads
5. Settings shows whether email/SMS providers are configured
