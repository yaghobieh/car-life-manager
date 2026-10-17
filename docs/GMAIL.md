# Gmail login and register

CLM already supports **email + password** and **Google / Gmail OAuth**. Gmail is not a separate product login. It is Google Identity with the `openid email profile` scopes.

Users can:

1. Register with email and password on `/auth`
2. Sign in with the same email and password
3. Click **Continue with Google** when Google env vars are set — first visit creates the user, later visits reuse the same account if the Gmail matches

Google does **not** replace PostgreSQL. Sessions still live in `AuthSession`.

## 1. Google Cloud

1. Open [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create or select a project
3. Configure the OAuth consent screen (External is fine for a personal app)
4. Create an **OAuth 2.0 Client ID** of type **Web application**
5. Add authorized JavaScript origins:
   - Local: `http://127.0.0.1:5188`
   - Production: `https://YOUR-VERCEL-DOMAIN`
6. Add authorized redirect URIs:
   - Local: `http://127.0.0.1:5188/api/auth/google/callback`
   - Production: `https://YOUR-VERCEL-DOMAIN/api/auth/google/callback`

## 2. Local `.env` (`apps/api/.env`)

```
GOOGLE_CLIENT_ID=....apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=....
GOOGLE_REDIRECT_URI=http://127.0.0.1:5188/api/auth/google/callback
WEB_ORIGIN=http://127.0.0.1:5188
```

Restart `npm run dev`. The Google button appears on `/auth` only when both client id and secret are set.

## 3. Vercel

Set the same keys in the Vercel project (Production + Preview):

| Name | Value |
| --- | --- |
| `GOOGLE_CLIENT_ID` | from Google Cloud |
| `GOOGLE_CLIENT_SECRET` | from Google Cloud |
| `GOOGLE_REDIRECT_URI` | `https://YOUR-VERCEL-DOMAIN/api/auth/google/callback` |
| `WEB_ORIGIN` | `https://YOUR-VERCEL-DOMAIN` |
| `AUTH_SECRET` | a long random string |
| `DATABASE_URL` | Neon pooled URL with `sslmode=require` |

Redeploy after saving env vars. If the redirect URI does not match Google Cloud exactly, Google returns to `/auth?error=google_failed`.

## Calendar

Gmail login does **not** grant Google Calendar access. That would need an extra OAuth scope and is not implemented.

Users add dates by:

- **Download calendar (.ics)** on Reminders — works in Apple Calendar, Outlook, and Google Calendar import
- **Add to Google Calendar** — opens Google’s public template URL for one reminder

See `docs/NOTIFICATIONS.md` for email and SMS.
