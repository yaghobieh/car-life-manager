# Integrations

Adapters live in `apps/api/src/integrations`. The dashboard loads them through `listReadyServices`. Status stays **לא נתמך** until an authenticated API exists.

| Provider | Discovery | Auth | Vehicle data | Status |
| --- | --- | --- | --- | --- |
| Ministry of Transport / data.gov.il | Yes | None (public) | Yes | Implemented |
| Highway 6 | Adapter ready | TBD | TBD | `not_supported` — needs partnership |
| Highway 6 North | Adapter ready | TBD | TBD | `not_supported` |
| Pango | Adapter ready | TBD | TBD | `not_supported` — no public OAuth |
| Cello | Adapter ready | TBD | TBD | `not_supported` |
| EasyPark | Adapter ready | TBD | TBD | `not_supported` |
| Insurance | Adapter ready | TBD | TBD | `not_supported` |
| Identity / SSO | Schema ready | Google / Apple | n/a | Cookie session now; Postgres + AuthIdentity for SSO |

data.gov.il has **no vehicle photos**. Overview uses CLM images in `apps/web/public/vehicles` by make. Provider marks in `apps/web/public/providers` are ours, not official brand assets.

UI copy always says **לא נתמך** for catalog providers until an authenticated adapter exists.
