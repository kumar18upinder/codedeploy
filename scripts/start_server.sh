#!/bin/bash
cd /var/www/html/ethos-backend
npm install
pm2 restart pm2.config.js
