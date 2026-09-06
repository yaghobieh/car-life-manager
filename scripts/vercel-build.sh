#!/usr/bin/env bash
set -euo pipefail
# shellcheck source=./vercel-root.sh
. "$(dirname "$0")/vercel-root.sh"
npx prisma generate --schema apps/api/prisma/schema.prisma
npm run build -w @clm/web
