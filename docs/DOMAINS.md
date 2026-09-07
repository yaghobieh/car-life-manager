# Domains and sites

HomeLife is one product family, one API, one Postgres database, one login.

| Site | Hostname | App route |
| --- | --- | --- |
| Platform | `homelife.app` | `/` |
| CarLife | `car.homelife.app` | `/car` (alias `/carlife`) |
| NadLife | `apartment.homelife.app` | `/property` (alias `/apartment`) |

All three hosts should point at the **same** Vercel project. The web app reads the host and sends `car.*` / `apartment.*` into the matching product. Auth stays `/auth` on every host.

Buy the names at your registrar (Route 53, Cloudflare, or Google Domains), then add them in Vercel → Project → Domains.

Callback URLs that must match exactly:

- Google: `{WEB_ORIGIN}/api/auth/google/callback`
- Auth0: `{WEB_ORIGIN}/api/auth/auth0/callback` plus the same URL in the Auth0 application Allowed Callback URLs
