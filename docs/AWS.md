# AWS

The live app is one Vercel project (Vite + `/api`). AWS is for the names and optional extras — **do not stand up a second API**.

## What to put on AWS

| Piece | Service | Notes |
| --- | --- | --- |
| `homelife.app` | Route 53 hosted zone | Apex + `car` + `apartment` records |
| `car.homelife.app` | CNAME / alias | Target the Vercel deployment |
| `apartment.homelife.app` | CNAME / alias | Same Vercel target |
| TLS | ACM only if you terminate on AWS | Prefer Vercel certificates |
| Secrets | SSM / Secrets Manager | Mirror Vercel env; never commit `.env` |
| Database | Keep Neon (current) or RDS Postgres | One DB for both products |

## What not to add

- A second Express/Harbor service for apartment
- A second Cognito/Auth0 tenant (one Auth0 app, one session cookie)
- Fake SMS or listings backends

`amplify.yml` in the repo root is a placeholder if you later host the static web build on Amplify. The API should still be the existing `/api` on Vercel (or one ALB in front of the same Node app).
