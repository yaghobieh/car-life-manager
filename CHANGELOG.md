## [Unreleased]

## [1.0.3] - 2026-09-12

### Added
- Dark mode toggle on the main, landing, and auth screens (saved in the browser)
- Language dropdown on the main app top bar
- Document vault: upload, download, and remove PDF, JPEG, PNG, or WebP (up to 4MB) through Cloudinary (`CLOUDINARY_URL`). Prisma stores metadata only.
- Test SMS from Settings, E.164 Israeli numbers, and a scheduled SMS when a reminder is created
- Username on register, unique username and email, and sign-in with email or username
- License plate is unique across accounts — adding a plate owned by another user is blocked
- Calendar events open in the portal first, then export as ICS or a Google Calendar template
- Overview and vehicle file show make/color car art from official MOT data

### Changed
- Car Manager is the only live product. Property Manager stays in the tree but is hard-disabled on landing, auth, hosts, and `/property`.
- Car pages follow the CarLife mock: blue canvas, amber plates, gradient hero, and light sidebar
- Reminder, maintenance, document, and expense forms use a card layout with paired fields
- Dark mode follows the CarLife mock tokens, and Bear inputs/tables follow the active theme
- Tasks are listed in Urgent / This week / Later / Completed groups

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
