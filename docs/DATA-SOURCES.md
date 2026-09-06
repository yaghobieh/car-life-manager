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

## Ministry of Transport — outstanding safety recalls

- Provider: Ministry of Transport via data.gov.il CKAN
- Purpose: Open manufacturer recall campaigns by plate (`MISPAR_RECHEV`)
- Official URL: https://data.gov.il/api/3/action/datastore_search
- Resource: `36bf1404-0be4-49d2-82dc-2f1ead4a8b93` (`hagbalat_recall`)
- Authentication: none
- Public/private: public
- Data: recall id, recall type, fault type, official description, open date
- Not available: whether the owner completed the repair
- Cache: 24h (`source = mot-recall`)
- Implementation: `apps/api/src/integrations/ministry-of-transport/recalls.client.ts`

## Development adapter

Used only when `VEHICLE_DATA_SOURCE=development` and an official lookup fails. The UI labels this as development data.
