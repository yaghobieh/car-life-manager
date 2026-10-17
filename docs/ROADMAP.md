# Roadmap

## Sprint 0.2 — Platform Shell (current)

Shipped: `/` platform picker, `/car` for the existing car loop, `/property` empty shell (overview / search / saved), shared auth with safe `next=`, legacy path redirects.

## MVP / 1.x (in progress)

Shipped in 1.0.1: official vehicle lookup, recalls, dashboard shell, tasks, services honesty, user expenses/documents/reminders, English locale, profile.

Still required for a trustworthy car MVP:

- Vehicle hero + “What’s next”
- Manual service confirmation
- Task engine + task drawer
- Document vault + secure storage
- Expense dashboard from recorded data only
- Maintenance + vehicle timeline
- Reminders + reports

## Sprint 0.3 (Property — in progress)

Shipped: official city/street search from data.gov.il, saved official addresses, user-entered lawyers.

Still honest:

- No listings marketplace or Land Authority “connected” badge
- No Israel Bar connection or fake lawyer cards
- SMS stays off until Twilio credentials are set

## V2

- Official partner integrations only when a real API exists
- Identity verification
- Notifications (in-app first; email/push/SMS behind an abstraction)
- Document extraction (architecture now, no fake OCR)
- Richer reports

## V3

- AI assistant over real vehicle context
- Insurance partnerships
- Service marketplace
- Vehicle sale workflow

Extension points already in the repo: `ProviderAdapter`, Prisma models, task-engine rules, optional `PROVIDER_HUB_URL`.
