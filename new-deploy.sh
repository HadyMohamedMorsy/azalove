#!/bin/bash

SERVER="root@82.112.240.180"
TARGET_DIR="/var/www/azalove/front"
APP_NAME="azalove-frontend"

echo "Starting incremental deployment..."

ssh $SERVER "
    cd $TARGET_DIR
    
    # Pull latest changes
    if [ -d '.git' ]; then
        git pull origin main
    else
        echo 'Not a git repository. Performing full deployment.'
        rm -rf *
        git clone https://github.com/HadyMohamedMorsy/azalove.git .
    fi
    
    # Install dependencies if package.json changed
    npm install
    
    # Build if necessary
    if [ -f 'package.json' ] && grep -q '"build"' package.json; then
        npm run build
    fi
"

# Restart PM2
ssh $SERVER "
    cd $TARGET_DIR
    pm2 reload $APP_NAME
    pm2 save
"

echo "Incremental deployment completed!"