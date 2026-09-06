# Roadmap

## MVP / 1.x (in progress)

Shipped in 1.0.1: official vehicle lookup, recalls, dashboard shell, tasks, services honesty, user expenses/documents/reminders, English locale, profile.

Still required for a trustworthy MVP:

- Vehicle hero + “What’s next”
- Manual service confirmation
- Task engine + task drawer
- Document vault + secure storage
- Expense dashboard from recorded data only
- Maintenance + vehicle timeline
- Reminders + reports
- Landing page

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
