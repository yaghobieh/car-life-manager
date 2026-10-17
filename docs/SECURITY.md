# Security

- Validate and normalize registration numbers server-side
- Owner check on every vehicle-scoped resource (IDOR protection)
- Lookup endpoint is rate limited
- Cookies are HttpOnly + SameSite=Lax
- No government ID storage
- Audit log excludes secrets and identity numbers
- File uploads store a Cloudinary (or local) storage key, never credentials or file bytes in the database
- `AUTH_SECRET`, `CLOUDINARY_URL`, and API URLs come from environment variables
