# Notifications and calendar

Reminders are stored in PostgreSQL. Delivery is honest: a channel sends only when the provider is configured **and** the user turned that channel on. Otherwise the row is stored as `skipped`. The app never marks a message as sent if it was not sent.

## Channels

| Channel | When it sends | User control |
| --- | --- | --- |
| In-app | Always recorded when a reminder is due | Always on |
| Email | `RESEND_API_KEY` is set and the user has an email | Settings → Email reminders |
| SMS | Twilio sid, token, and from-number are set and the user has a phone | Settings → SMS reminders |

Due reminders are dispatched when the dashboard loads or a reminder is created. Each reminder is sent once per channel (`userId + sourceKey + channel`).

## Email (Resend)

1. Create a Resend account and verify a sending domain
2. Set on Vercel and in `apps/api/.env`:

```
RESEND_API_KEY=re_...
NOTIFY_FROM_EMAIL="Car Life Manager <noreply@your-domain.com>"
```

Without `RESEND_API_KEY`, email stays `skipped` with `not_configured`.

## SMS (Twilio)

Sign up here: https://www.twilio.com/try-twilio

1. Create a Twilio account (trial is enough to test)
2. Buy or use a sending number (Israel: `+972…`)
3. Copy Account SID, Auth Token, and From number into Vercel and `apps/api/.env`:

```
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_FROM_NUMBER=+972...
```

Put the user’s mobile in Settings. Without Twilio, SMS stays `skipped`.

## Calendar

- `GET /api/vehicles/:id/calendar.ics` — ICS of official dates, reminders, and dated tasks
- Reminders page: download ICS or open a Google Calendar template for one item
- Live Google Calendar API sync is **not** implemented

## Neon `P1001`

`Can't reach database server at ...neon.tech:5432` means the API cannot open a TCP connection to Neon. It is not an auth bug.

Check:

1. Neon project is not paused
2. `DATABASE_URL` uses the **pooler** host and `sslmode=require`
3. Local network / VPN can reach `*.aws.neon.tech:5432`
4. On Vercel, `DATABASE_URL` is set for Production

The API now returns HTTP 503 `db_unreachable` instead of a raw Prisma crash.
