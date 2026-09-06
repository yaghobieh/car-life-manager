## [1.0.1] - 2026-09-06

### Added
- Official Ministry of Transport safety recalls (`hagbalat_recall` on data.gov.il) on lookup, dashboard, and tasks
- Google sign-in returns to `/auth` with a real error when OAuth fails or is not configured
- Account name and Google photo in Settings; official make/model on the vehicle switcher

### Changed
- Version is 1.0.1 across the monorepo
- Google button shows only when `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set

### Fixed
- OAuth callback no longer dumps a JSON 401 on the browser after a failed Google return
