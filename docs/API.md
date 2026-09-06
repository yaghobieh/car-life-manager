# API

Base: `/api`

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/vehicles/lookup/:registrationNumber` | Public MOT lookup, rate limited |
| GET | `/vehicles` | Current session vehicles |
| POST | `/vehicles` | `{ registrationNumber }` |
| GET | `/vehicles/:id` | Dashboard aggregate |
| DELETE | `/vehicles/:id` | Owner only |
| GET | `/vehicles/:id/tasks` | |
| PATCH | `/tasks/:id` | `{ status }` |
| GET | `/vehicles/:id/services` | Catalog + unsupported status |
| GET/POST | `/vehicles/:id/expenses` | |
| GET | `/vehicles/:id/reminders` | |
| GET | `/identity/status` | Always `unavailable` until a real provider exists |
| GET | `/health` | Harbor health |

Errors return `{ error, code? }` and never crash the dashboard because one provider failed.
