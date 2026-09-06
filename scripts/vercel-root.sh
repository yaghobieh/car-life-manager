#!/usr/bin/env bash
set -euo pipefail
while [ ! -f package-lock.json ] || [ ! -f package.json ]; do
  cd ..
  if [ "$PWD" = "/" ]; then
    echo "Could not find the monorepo root"
    exit 1
  fi
done
