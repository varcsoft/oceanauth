#!/bin/bash

git pull
npm ci
npx prisma generate
pm2 restart index.js --name=oceanauth