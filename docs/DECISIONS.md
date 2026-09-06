# Decisions

## ADR-001 Persistence

Prisma is the TypeScript ORM (schema → generated client → typed queries). Local database is **SQLite** (`file:./dev.db`). Production should use PostgreSQL by changing `DATABASE_URL`. Harbor’s Mongo ODM is not used.

## ADR-007 Integrations are adapters, not microservices

`apps/api/src/integrations` are in-process adapters to official external APIs (Ministry of Transport now; Pango / CelloPark / Highway 6 later). They are not separate deployable services.

## ADR-002 Harbor role

Harbor is the HTTP server, health check, rate limiter, and request logger. It is not a frontend application shell (that package is a Node backend framework).

## ADR-003 Frontend shell

Web UI is Bear primitives only (Sidebar, Card, Badge, Button, Input, Grid). State is Synapse. Copy is Lingo (Hebrew default, English bundled). No project CSS file. Sidebar width is `SIDEBAR_WIDTH` in `@const` (220). Further compacting is scheduled for 1.0.1.

## ADR-004 Public vehicle source

CKAN `datastore_search` on data.gov.il resource `053cea08-09bc-40ec-8f7a-156f0677aff3`.

## ADR-005 No fake connections

Parking and toll adapters expose `not_supported` until a real authenticated API exists.

## ADR-006 Session foundation

Anonymous HttpOnly cookie user. Replace with Forge auth when wiring production identity.
