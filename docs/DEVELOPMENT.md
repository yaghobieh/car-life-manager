# Development

```bash
npm install
cp .env.example apps/api/.env
npm run db:generate
npx prisma migrate dev --name init --schema apps/api/prisma/schema.prisma
npm run dev:api
npm run dev:web
npm test
npm run lint
npm run build
```

`VEHICLE_DATA_SOURCE=official` (default) always calls data.gov.il.

Frontend: http://127.0.0.1:5188  
API: http://127.0.0.1:4173
