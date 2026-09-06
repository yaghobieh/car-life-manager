# Product

Car Life Manager (CLM) is a **Vehicle Life Management Platform**.

Primary message: **Everything you need for your car. In one place.**

Hebrew: **כל מה שצריך לרכב שלך. במקום אחד.**

Secondary: **קנית רכב? אנחנו נדאג שלא תשכח כלום.**

The product answers three questions:

1. What do I need to do with my car?
2. What do I need to remember?
3. How much is my car costing me?

It should feel like a personal assistant, a digital vehicle file, a task manager, a maintenance tracker, and a financial dashboard. It should not feel like a government portal, an insurance site, a CRM, a spreadsheet, or a bank clone.

Hebrew is the default locale (`dir="rtl"`). English is a real Lingo locale, not hardcoded copy.

## Trust rules (non-negotiable)

- Do not scrape private provider accounts.
- Do not ask for third-party passwords.
- Do not mark Pango, CelloPark, Highway 6, or insurers as connected without a verified API.
- Do not invent expenses, analytics, or official photos.
- Every important field should eventually show a source: Official, User provided, Document, Calculated, External confirmation, or Unknown.
- Manual confirmation is stored as user-confirmed, never as provider-verified.
- Development mocks stay behind adapters and must never look verified in production.

Official public sources in use today: Ministry of Transport vehicle registry and safety recalls on data.gov.il. Commercial parking/toll adapters exist and stay `not_supported` unless `PROVIDER_HUB_URL` returns verified JSON.

## Principles

1. Action first — tell the user what to do next.
2. Trust — always show where information came from.
3. Simplicity — users should not need to understand bureaucracy.
4. Ownership — the user controls their data.
5. Extensibility — providers can be integrated later.
6. No fake automation — never claim to know something we do not know.

## What 1.0.1 already does

- Auth (email/password, optional Google)
- Official plate lookup and recall check
- Multi-vehicle dashboard with official status, compare, and painted car art
- Task list with mark-done and official-site links
- Services: official MOT/recalls first; others open the official site and log a receipt
- User-entered expenses, document metadata, and reminders
- Header search and editable profile
- Harbor is the API layer; Bear `AppShell` is the UI shell

## V2 product surface (tracked in Jira)

Remaining work is opened as Jira stories under the V2 epic. Do not pretend these are shipped:

- Dashboard “מה נשאר לעשות?” + vehicle hero
- Manual service confirmation (`USER_CONFIRMED`)
- Rule-driven task engine + task drawer
- Vehicle page with tabs and timeline
- Document vault with secure object storage (files not in the database)
- Expense dashboard and “my car costs me…” based only on recorded expenses
- Maintenance timeline
- Actionable reminders and reports
- Landing page and brand
- Source badges on important fields

Partner APIs, document extraction, and notifications stay later. Extraction UI may show processing or a manual-entry fallback — never fake extracted fields.
