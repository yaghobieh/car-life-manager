## [1.0.2] - 2026-09-06

### Added
- Public landing page and vehicle file with tabs and timeline
- Manual service confirmation stored as user-confirmed, never as Connected
- Task groups, task drawer, source badges, and What’s Next
- Maintenance records, expense cost insight, and reports from recorded data only
- Email and SMS reminder dispatch (Resend / Twilio) with skipped status when not configured
- ICS calendar download and Add to Google Calendar template links
- Settings toggles for email and SMS notifications

### Changed
- Vercel build runs `prisma migrate deploy` so new tables exist in production
- Database connection failures return HTTP 503 `db_unreachable` instead of a raw Prisma crash

### Fixed
- Bear component IDs, extracted page RFCs, and official-site buttons (no raw anchors)

## [1.0.1] - 2026-09-06

### Added
- Official Ministry of Transport safety recalls (`hagbalat_recall` on data.gov.il) on lookup, dashboard, and tasks
- Google sign-in returns to `/auth` with a real error when OAuth fails or is not configured
- Account name and Google photo in Settings; official make/model on the vehicle switcher
- Official MOT registry and recall sources on Services (public APIs, not account connections)
- Car color from MOT paints the vehicle image, plus a 3D photo view and official-field compare
- Header search over vehicles, tasks and services; editable name and phone on the profile
- User can add expenses, documents and reminders; tasks can be marked done with official-site links
- Optional `PROVIDER_HUB_URL` probe for parking/toll APIs — stays unsupported unless the hub returns verified JSON

### Changed
- Version is 1.0.1 across the monorepo
- Google button shows only when `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set

### Fixed
- OAuth callback no longer dumps a JSON 401 on the browser after a failed Google return
- English uses Inter, document language/direction, and translated status/task/provider labels
- Grid Table light tokens apply; language select has a label and width
- Overall status sits under the car block instead of a side column
