# Data sources

## Ministry of Transport — private and commercial vehicles

- Provider: Ministry of Transport via data.gov.il CKAN
- Purpose: Public vehicle lookup by registration number
- Official URL: https://data.gov.il/api/3/action/datastore_search
- Resource: `053cea08-09bc-40ec-8f7a-156f0677aff3`
- Authentication: none
- Public/private: public
- Data: make, commercial name, year, fuel, color, license validity, last test, road-entry date, ownership type
- Not available: ownership hand, mileage, insurance, connected parking/toll accounts
- Rate limits: unknown official quota; API is rate-limited at 20 lookups/minute/session
- Cache: 24h for successful public records (`fetchedAt`, `expiresAt`, `source`)
- Legal: use only public fields; do not scrape private accounts
- Implementation: `apps/api/src/integrations/ministry-of-transport`

## Development adapter

Used only when `VEHICLE_DATA_SOURCE=development` and an official lookup fails. The UI labels this as development data.
