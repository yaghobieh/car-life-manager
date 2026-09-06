# Security

- Validate and normalize registration numbers server-side
- Owner check on every vehicle-scoped resource (IDOR protection)
- Lookup endpoint is rate limited
- Cookies are HttpOnly + SameSite=Lax
- No government ID storage
- Audit log excludes secrets and identity numbers
- File uploads (planned) must stay as storage keys, never credentials
- `AUTH_SECRET` and API URLs come from environment variables
