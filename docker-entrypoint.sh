#!/bin/sh
echo "📦 Running migrations..."
npx prisma migrate deploy

echo "📦 กำลังเริ่มระบบ..."
node scraper.js &
node src/server.js
