# Domains and sites

HomeLife is one product family, one API, one Postgres database, one login.

Hebrew name: **רכב ודירה**. English: **Car & Home**.

| Site | Hostname | App route |
| --- | --- | --- |
| Platform | `homelife.app` | `/` |
| CarLife | `car.homelife.app` | `/car` (alias `/carlife`) |
| NadLife | `apartment.homelife.app` | `/property` (alias `/apartment`) |

All three hosts should point at the **same** Vercel project. The web app reads the host and sends `car.*` / `apartment.*` into the matching product. Auth stays `/auth` on every host.

## Local

Vite listens on every interface (`0.0.0.0:5188`). `*.localhost` resolves to `127.0.0.1`.

| Product | Path on 127.0.0.1 | Local product host |
| --- | --- | --- |
| Platform | http://127.0.0.1:5188/ | http://localhost:5188/ |
| CarLife | http://127.0.0.1:5188/car | http://car.localhost:5188 |
| NadLife | http://127.0.0.1:5188/property | http://apartment.localhost:5188 |

`car.localhost` and `apartment.localhost` are different cookie hosts from `127.0.0.1`. Sign in on the host you are using.

Buy the names at your registrar (Route 53, Cloudflare, or Google Domains), then add them in Vercel → Project → Domains.

Callback URLs that must match exactly:

- Google: `{WEB_ORIGIN}/api/auth/google/callback`
- Auth0: `{WEB_ORIGIN}/api/auth/auth0/callback` plus the same URL in the Auth0 application Allowed Callback URLs
