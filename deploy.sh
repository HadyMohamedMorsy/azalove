SERVER="root@82.112.240.180"
TARGET_DIR="/var/www/azalove/front"
APP_NAME="azalove-frontend"

# Navigate to target directory
cd $TARGET_DIR

# Move node_modules to parent directory
mv node_modules ../

# Remove all files and directories
rm -rf *

# Clone the repository
git clone https://github.com/HadyMohamedMorsy/azalove.git

# Enter the project directory
cd azalove

# Move all files and directories to parent directory
mv * ../

# Go back to parent directory
cd ../

# Remove the empty azalove directory
rm -rf azalove

# Go back to parent directory
cd ..

mv node_modules ./front

echo "Restarting PM2 process..."
ssh $SERVER "cd $TARGET_DIR && \
             pm2 delete $APP_NAME && \
             pm2 save && \
             pm2 start $APP_NAME && \
             pm2 save && \
             pm2 startup"

echo "Frontend deployment completed successfully!"