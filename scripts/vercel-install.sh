#!/usr/bin/env bash
set -euo pipefail
# shellcheck source=./vercel-root.sh
. "$(dirname "$0")/vercel-root.sh"
npm install --include=dev
