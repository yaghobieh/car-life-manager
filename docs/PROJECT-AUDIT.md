# Project audit — Sprint 0.1

Audit date: 2026-09-07. Scope: repository as it exists today, plus the Property Manager HTML mock at `/Users/user/Downloads/nadlife-manager.html`. No product code was added in this sprint.

---

## 1. What this repo is today

This repository is **Car Life Manager (CLM)** — a single-product Israeli RTL SaaS for vehicle ownership. It is not yet a multi-product platform.

Primary message today: everything you need for your car, in one place.

The master specification wants a **Home & Mobility** family:

| Product | Status |
| --- | --- |
| Platform landing (`/`) | Missing. `/` is the signed-in **car** overview. Marketing landing is `/welcome` and is car-only. |
| Car Manager | Live as the whole app |
| Property / Apartment Manager | Design mock only. No routes, models, or APIs |

---

## 2. Repository layout

```
apps/web          Vite + React 18 + TypeScript
apps/api          Express + Prisma + PostgreSQL
packages/shared   Domain types, plate rules, task engine, expenses, timeline
docs/             Product, architecture, sources, security
```

Workspaces: `apps/*`, `packages/*`. Root scripts: `dev`, `dev:web`, `dev:api`, `build`, `test`, `lint`, `db:migrate`. Node `>=20`. Version on disk: `1.0.3`.

Deploy: one Vercel project serving Vite `apps/web/dist` plus Harbor-named `/api` functions (`vercel.json`). Preview recently deployed from `design/carlife-html`.

---

## 3. Frontend

### Stack (actual)

| Spec asked for | Installed / used |
| --- | --- |
| React + TypeScript + Vite | Yes (`apps/web`) |
| Tailwind | **Not installed. Do not add.** |
| SCSS | **Not used.** Product chrome is `apps/web/src/common/clm.css` |
| Redux / Saga | **Not used.** State is **Synapse** (`createNucleus`) |
| Harbor as UI shell | **Wrong package for this.** Harbor is a Node HTTP framework |
| BearUI | Yes `@forgedevstack/bear` `^1.3.2` + `@forgedevstack/bear-icons` |
| Grid Table | Yes `@forgedevstack/grid-table` `^1.1.5` via `ClmGridTable` |
| Lingo | Yes `@forgedevstack/lingo` `^1.0.2`, default locale `he` |
| React Router 7 | Yes |

### Routing (actual)

| Path | Page |
| --- | --- |
| `/welcome` | Car marketing landing |
| `/auth` | Email/password + Google |
| `/onboarding` | Add first vehicle |
| `/` | Car overview (behind `Gate` + `AppShell`) |
| `/vehicles`, `/vehicle`, `/tasks`, `/services`, `/expenses`, `/documents`, `/maintenance`, `/reminders`, `/reports`, `/settings` | Car product |

There is **no** `/car` or `/property` prefix. Signed-out users hit `/welcome`. Signed-in users with zero vehicles hit `/onboarding`.

### UI architecture

Bear is used for theme (`BearProvider`, RTL, `CLM_BEAR_THEME`) and primitives: `Button`, `Input`, `Select`, `Badge`, `Card`, `Flex`, `Box`, `Typography`.

The **page chrome is custom**, not Bear `Sidebar`:

- `AppShell` + `AppShellSidebar` + `AppShellSearch`
- Shared layout primitives in `apps/web/src/common/` (`ClmHero`, `ClmStatCard`, `ClmList`, `ClmRow`, `ClmEmpty`, …)
- Tokens in `apps/web/src/constants/generals.const.ts` and CSS variables in `clm.css`

This split exists because Bear chrome did not match the CarLife HTML mock. **Reuse this pattern for Property Manager.** Do not reintroduce Bear `Sidebar` as the product shell.

### Aliases

`@const`, `@hooks`, `@theme`, `@pages`, `@components`, `@common`, `@store`, `@locales`, `@api`, `@logger`.

Imports more than one level up must use these aliases (workspace rule).

### Pages / components to reuse

Reusable as-is: `Auth`, `LocaleSelect`, `EmptyState`, `SvgAsset`, `ClmGridTable`, `PageHeader`, Lingo locales, Synapse `appNucleus`.

Car-specific: `PlateBadge`, `CarArt`, vehicle nav, MOT services. Keep them under a future `/car` product, do not leak into Property.

---

## 4. Forge Dev Stack — real usage

Inspected packages, not invented APIs.

| Package | Role today | Role in the master spec | Decision |
| --- | --- | --- | --- |
| `@forgedevstack/bear` | Theme + primitives | Buttons, inputs, cards, dialogs, badges | Keep. Inspect Bear exports before new components. |
| `@forgedevstack/grid-table` | `ClmGridTable` wrapper | Property / expense / document tables | Keep. Use for tabular Property views. |
| `@forgedevstack/lingo` | Hebrew-default copy | Not named in spec | Keep. All new Property copy goes through Lingo. |
| `@forgedevstack/synapse` | App session + dashboard | Spec mentioned Redux | **Keep Synapse.** Do not add Redux. |
| `@forgedevstack/harbor` | Listed in `apps/api/package.json` and README | Spec asked Harbor for **application shell** | Harbor is a **backend** framework. **Do not use it for React navigation.** ADR-002 already says this. There is currently **no Harbor import in API source**; Express is wired by hand in `register.utils.ts`. |

Never invent Forge APIs. Read the installed package types before calling anything new.

---

## 5. Backend

### Stack

Express 4, Prisma 6, PostgreSQL (`DATABASE_URL`). `mongodb` is a leftover dependency; ADR-001 says PostgreSQL only.

API mount: `/api`. Vite proxies `/api` and `/health` to `127.0.0.1:4173`.

Routes today:

- `POST /api/auth/register|login|logout`
- `GET|PATCH /api/auth/me`
- `GET /api/auth/google` + callback
- `GET /api/auth/auth0` + callback (API leftover; **no Auth0 button** in the web app)
- Vehicles, lookup, tasks, expenses, documents, maintenance, reminders, calendar ICS, identity, meta

### Auth (actual)

- Session cookie `clm_session` (HttpOnly)
- Email/password register + login
- Google OAuth when `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` are set
- Clerk removed
- Auth0 Universal Login is **not** on `/auth`. Do not surface it.

Shared platform services that already exist and should stay shared: User, AuthIdentity, AuthSession, Notification, AuditLog, profile, locale.

### Integrations

`apps/api/src/integrations/*` — adapter pattern. Official MOT + recalls via data.gov.il. Pango / CelloPark / Highway 6 stay `not_supported` unless a verified hub API returns connected.

This is the model Property Manager must copy: `PropertyDataProvider`, `ListingProvider`, `MapProvider` as adapters. No scraping. No invented connections.

---

## 6. Database (Prisma)

Car-centric models: `User`, `Vehicle`, `Task`, `Expense`, `VehicleDocument`, `MaintenanceRecord`, `Reminder`, `VehicleLookupCache`, `AuthIdentity`, `AuthSession`, `ServiceConnection`, `ProviderConnection`, `Notification`, `AuditLog`.

**No** Property, Building, Unit, Listing, SavedProperty, Search, Professional, or Transaction models.

`User` currently has `vehicles[]` only. A platform `Product` membership is not modeled.

Source metadata already exists on vehicles (`dataSource`, `dataProvenance`) and in `@clm/shared` (`DataProvenance`, `ServiceSource`). Extend that vocabulary; do not invent a second source system.

---

## 7. Shared package

`@clm/shared` owns plate rules, task engine, task groups, expense math, timeline, calendar ICS helpers, provider ids, source mapping.

Property scoring, price/m², and listing search **do not belong in React**. Add them here (or a sibling package) when Phase 2 starts.

---

## 8. Design system (actual)

Central tokens (do not scatter raw colors):

| Token | Value | Use |
| --- | --- | --- |
| `COLOR_NAVY` / ink | `#161B22` | Sidebar, text |
| `COLOR_BG` / paper | `#F2F0EA` | Canvas |
| `COLOR_BLUE` | `#2F6BFF` | Accent, plates, primary actions |
| `COLOR_GREEN` | `#1F8A57` | Success |
| `COLOR_WARNING` | `#B5790A` | Warning |
| `COLOR_DANGER` | `#C6432E` | Danger |
| Font | Heebo (he), Inter (en) | Body and titles |

CSS mirrors these as `--clm-*` in `clm.css`. Bear theme maps the same tokens.

`docs/DESIGN-SYSTEM.md` is car-era and slightly stale (it still mentions Bear Sidebar). Sprint 0.3 should refresh it for a **shared platform** + two product shells.

Hebrew / RTL is first-class (`dir` from Lingo, `DirectedBear`).

---

## 9. Property design mock (NadLife HTML)

Source: `/Users/user/Downloads/nadlife-manager.html`  
Title in mock: **NadLife · ניהול חיי הנכס שלך**  
RTL Hebrew. Heebo + **David Libre** (serif titles) + JetBrains Mono.

### Screens in the mock

| Mock page | Intent | Ship in early sprints? |
| --- | --- | --- |
| סקירה כללית | Discovery hero + address search + listing cards | Yes, as empty/official-only UI |
| לוח דירות | Buy / rent / new-build tabs + cards | UI only until a listing adapter exists |
| מידע על נכס | Address lookup, גוש/חלקה, official source rows | Yes, with official-or-empty only |
| הצעות | Discount / partner offers | **No production content** until real partners exist |
| ניהול הוצאות | Monthly totals + table | Reuse car expense pattern; no fake totals |
| עורכי דין | Marketplace cards + stars | **No invented lawyers or ratings** |
| מסמכים | Empty vault | Yes |
| הגדרות | Locale + alerts | Yes; do **not** mark Israel Land Authority as connected |

### Layout vs Car Manager

| | Car (live) | NadLife mock |
| --- | --- | --- |
| Sidebar | Dark ink `#161B22` | Light paper, left border |
| Accent | Blue `#2F6BFF` | Forest / brass `#1F7A5C` |
| Titles | Heebo | David Libre serif |
| Hero | Dark car hero | Dashed paper + grid |
| Cards | Warm paper | Same idea, greener paper `#F4F5F1` |

**Color decision (requested): Property Manager uses CLM blue, not NadLife green.**

Map mock tokens to existing CLM tokens:

| NadLife | Do not use | Use instead |
| --- | --- | --- |
| `--brass` `#1F7A5C` | Green accent | `COLOR_BLUE` / `--clm-blue` `#2F6BFF` |
| `--brass-deep` `#155A44` | Dark green | `#2F6BFF` or navy ink |
| `--brass-bg` `#DEEFE6` | Green wash | Light blue wash (new token, e.g. `#E8EEFF`) |
| `--ink` `#12201A` | Green-black | `COLOR_INK` `#161B22` |
| `--paper` `#F4F5F1` | Sage paper | `COLOR_BG` `#F2F0EA` (same family) |
| `--good` `#2C6E8A` | Teal | Keep `COLOR_GREEN` or a blue-teal if needed — not brass |
| Ink-on-brass buttons | Green text on black | White text on `#2F6BFF` (same as car plates) |

Keep the mock’s **structure**: light-or-dark sidebar, dashed hero, listing cards, lookup result, official source rows, empty vaults. Recolor to the car family so both products feel like one platform.

David Libre is optional. Prefer Heebo-only unless Sprint 0.3 explicitly adds a shared display serif.

### Mock data that must never become production

The HTML invents listing counts (1,248), closed deals, lawyer names, star ratings, availability, TM"A status, arnona estimates, and a **connected** Israel Land Authority pill. Treat all of that as **visual placeholder only**. Production shows empty states or official adapter results with a source badge.

The footer line “מבוסס נתונים רשמיים מ־data.gov.il · רשות מקרקעי ישראל” is allowed only after a real official API is wired. Same rule as Pango / Highway 6 on the car side.

---

## 10. State, i18n, tests, lint

- **State:** one Synapse nucleus (`appNucleus`) for user, vehicles, dashboard, Google flag, notify flags. Property state should be a **new nucleus or module**, not a second paradigm.
- **i18n:** `apps/web/src/locales/he.const.ts` + `en.const.ts`. Default `he`.
- **Lint:** `tsc --noEmit` in web and api (`npm run lint`).
- **Tests:** Vitest. Shared: plate, tasks, expenses, timeline. API: MOT mapping, auth utils. Web: Auth error keys, Overview, a few utils.
- **No ESLint project** beyond TypeScript.

---

## 11. Documentation that already exists

`docs/PRODUCT.md`, `ARCHITECTURE.md`, `DOMAIN-MODEL.md`, `API.md`, `DATA-SOURCES.md`, `INTEGRATIONS.md`, `DESIGN-SYSTEM.md`, `SECURITY.md`, `PRIVACY.md`, `DEVELOPMENT.md`, `TESTING.md`, `ROADMAP.md`, `DECISIONS.md`, `SSO.md`, `GMAIL.md`, `VERCEL.md`.

Stale vs reality:

- ADR-003 still says Bear Sidebar and “no project CSS”. The live shell is custom `Clm-*` + `clm.css`.
- ADR-006 still mentions anonymous cookie users. Those are gone.
- PRODUCT.md still describes Harbor as the live API layer; source uses Express directly.
- ROADMAP.md is car-only.

Do not rewrite those in this sprint. Sprint 0.2+ should update them when routes and products change.

---

## 12. Risks

1. **`/` collision.** Spec wants platform home at `/`. Today `/` is the car dashboard. Moving car to `/car` is the main Sprint 0.2 breakage (bookmarks, `Gate`, onboarding, Vercel).
2. **Harbor-as-shell in the spec.** Implementing that would fight ADR-002 and the installed package. Ignore that line; use `AppShell` + Bear + Clm.
3. **Listing / lawyer / Land Authority claims** in the HTML. Easy to ship fake marketplace data.
4. **No official property API yet.** Discovery UI must be empty or adapter-backed. data.gov.il has some planning/building datasets; none are wired.
5. **Auth0 leftover** on the API. Harmless if unused; do not document it as a product login.
6. **Google on Vercel** needs `GOOGLE_*` + matching Cloud redirect, or the button stays disabled.
7. **Two sidebar languages** (car dark vs NadLife light). Platform should pick one shared shell, then product nav items.
8. **Shared expenses/documents** are vehicle-scoped in Prisma. Property copies need their own FK or a generic Asset attachment. Do not overload `vehicleId`.

---

## 13. Recommended structure (do not build yet)

Keep the monorepo. Add product prefixes without a rewrite:

```
/                 platform landing (signed-out or product picker)
/auth             shared
/car              current AppShell + car pages (moved)
/property         new Property shell (NadLife layout, CLM blue)
```

Shared: auth, user, Lingo, Bear theme, Clm tokens, notifications, document storage interface, provider adapters, audit.

Separate: vehicle vs property domain tables, nav, search.

Car stays the working product. Property starts as shell + empty discovery (Phase 1) with official-source discipline.

---

## 14. Missing for the platform (later sprints)

- Product switcher and `/` platform landing
- `/car/*` remount of existing pages
- Property routes, nav, Lingo keys
- Prisma property family
- Listing / map / professional adapters
- Official property data adapter (only if a permitted API exists)
- Tailwind / Redux / Harbor UI — **not missing; do not add**

---

## 15. Sprint 0.2 — Platform Shell (started)

Built: `/` product picker, car remounted under `/car`, Property empty shell at `/property`, `/property/search`, `/property/saved`, shared auth `?next=`, legacy redirects. Accent stays CLM blue. No listings backend. No fake lawyers or Land Authority connection.

Next sprint (0.3) should not invent property listings. Add models only with a real domain object and a permitted official source.

---

## Sprint report

```
Sprint: 0.1 — Repository Audit
Completed: yes
Files changed: docs/PROJECT-AUDIT.md, docs/README.md
Tests: not required (docs only)
Build: not required (docs only)
Known limitations: Harbor is unused in API source despite being a dependency; several ADRs are stale; Property exists only as an HTML mock; no official property API is wired.
Next sprint: 0.2 — Platform Shell (in progress in product code)
```

```
Sprint: 0.2 — Platform Shell
Completed: yes
Files changed: web routes, Platform, Property shell/pages, auth next=, AppShell brand → /, locales, clm.css, docs
Tests: Auth.utils afterAuthPath, Route.utils, activeNavId, AppLoader needsDashboard
Known limitations: Property has no models or official API; search input cannot return listings; /car/settings is the only account page
Next sprint: 0.3 — Property domain only with official-or-nothing (do not start unless requested)
```
