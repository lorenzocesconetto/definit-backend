#!/bin/sh

set -e

# Apply migrations
DATABASE_URL="postgresql://user:pass@db:5432/definit?schema=public" npx prisma migrate deploy

# Populate db
DATABASE_URL="postgresql://user:pass@db:5432/definit?schema=public" npx prisma db seed

# Run server
yarn start
