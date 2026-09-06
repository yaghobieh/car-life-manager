#!/usr/bin/env bash
set -euo pipefail
# shellcheck source=./vercel-root.sh
. "$(dirname "$0")/vercel-root.sh"
npx prisma generate --schema apps/api/prisma/schema.prisma
if [ -n "${DATABASE_DIRECT_URL:-}" ]; then
  DATABASE_URL="$DATABASE_DIRECT_URL" npx prisma migrate deploy --schema apps/api/prisma/schema.prisma
elif [ -n "${DATABASE_URL:-}" ]; then
  npx prisma migrate deploy --schema apps/api/prisma/schema.prisma
else
  echo "DATABASE_URL is missing; skipping prisma migrate deploy"
fi
npm run build -w @clm/web
rm -rf apps/api/public
mkdir -p apps/api/public
cp -R apps/web/dist/. apps/api/public/
