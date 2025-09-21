SERVER="root@82.112.240.180"
TARGET_DIR="/var/www/azalove/front"
APP_NAME="azalove-frontend"

# Execute all deployment commands on the server
ssh $SERVER "cd $TARGET_DIR && \
             mv node_modules ../ && \
             rm -rf * && \
             git clone https://github.com/HadyMohamedMorsy/azalove.git && \
             cd azalove && \
             mv * ../ && \
             cd ../ && \
             rm -rf azalove && \
             cd .. && \
             mv node_modules ./front"

echo "Restarting PM2 process..."
ssh $SERVER "cd $TARGET_DIR && \
             pm2 delete $APP_NAME && \
             pm2 save && \
             pm2 start $APP_NAME && \
             pm2 save && \
             pm2 startup"

echo "Frontend deployment completed successfully!"