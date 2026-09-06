# Decisions

## ADR-001 Persistence

Prisma + SQLite locally. Schema is small and portable to PostgreSQL. Harbor’s Mongo ODM is not used because the product brief prefers relational data and PostgreSQL.

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
