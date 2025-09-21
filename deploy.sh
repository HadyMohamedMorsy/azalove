#!/bin/bash

# Configuration
SERVER="root@46.202.170.91"
TARGET_DIR="/var/www/azalove/front"
APP_NAME="azalove-frontend"
REPO_URL="https://github.com/HadyMohamedMorsy/azalove.git"
BRANCH="main"  # أو الفرع الذي تريد استخدامه

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Deployment function
deploy() {
    print_status "Starting deployment to $SERVER"
    
    # Step 1: Backup and prepare directory
    print_status "Preparing target directory..."
    ssh $SERVER "
        cd $TARGET_DIR || { echo 'Target directory not found!'; exit 1; }
        
        # Backup node_modules if exists
        if [ -d 'node_modules' ]; then
            mv node_modules ../node_modules_backup
        fi
        
        # Clean directory except possibly some config files
        rm -rf * .git* 2>/dev/null || true
    " || { print_error "Failed to prepare directory"; return 1; }
    
    # Step 2: Clone and setup new code
    print_status "Cloning new code from repository..."
    ssh $SERVER "
        cd $TARGET_DIR
        git clone $REPO_URL -b $BRANCH ./tmp_repo || { echo 'Git clone failed!'; exit 1; }
        mv ./tmp_repo/* ./tmp_repo/.* . 2>/dev/null || true
        rm -rf ./tmp_repo
    " || { print_error "Failed to clone repository"; return 1; }
    
    # Step 3: Restore node_modules or install new ones
    print_status "Setting up node modules..."
    ssh $SERVER "
        cd $TARGET_DIR
        
        # Try to restore backup or install new
        if [ -d '../node_modules_backup' ]; then
            mv ../node_modules_backup ./node_modules
            print_warning 'Using backed up node_modules. Run npm install if needed.'
        else
            npm install || { echo 'npm install failed!'; exit 1; }
        fi
        
        # Build if needed (for React/Vue/Angular apps)
        if [ -f 'package.json' ] && grep -q '"build"' package.json; then
            npm run build || { echo 'Build failed!'; exit 1; }
        fi
    " || { print_error "Failed to setup node modules"; return 1; }
    
    # Step 4: Restart application with PM2
    print_status "Restarting PM2 process..."
    ssh $SERVER "
        cd $TARGET_DIR
        
        # Delete existing process if running
        pm2 delete $APP_NAME 2>/dev/null || true
        
        # Start the application
        if [ -f 'ecosystem.config.js' ] || [ -f 'ecosystem.config.cjs' ]; then
            pm2 start ecosystem.config.js --env production
        else
            # Fallback: start directly from package.json
            if [ -f 'package.json' ] && grep -q '"start"' package.json; then
                pm2 start npm --name \"$APP_NAME\" -- run start
            else
                echo 'No start script or ecosystem config found!'
                exit 1
            fi
        fi
        
        # Save and setup startup
        pm2 save
        pm2 startup 2>/dev/null || true
    " || { print_error "Failed to restart PM2 process"; return 1; }
    
    print_status "Deployment completed successfully!"
    return 0
}

# Execute deployment
deploy