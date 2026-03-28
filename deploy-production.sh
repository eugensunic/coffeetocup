#!/bin/bash

# CoffeeToCup Production Deployment Script
# Clones fresh repo and deploys to production
# Run this on your Digital Ocean server: bash deploy-production.sh

set -e  # Exit on error

echo "=========================================="
echo "CoffeeToCup Production Deployment"
echo "=========================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Clone the latest repository
echo -e "\n${BLUE}Step 1: Cloning latest repository...${NC}"
cd /var/www || { echo "Error: /var/www not found"; exit 1; }

# Remove old directory if exists
if [ -d "coffeetocup" ]; then
    echo "Removing old deployment..."
    rm -rf coffeetocup
fi

# Fresh clone
git clone https://github.com/eugensunic/coffeetocup.git
cd coffeetocup/main || { echo "Error: Failed to navigate to coffeetocup/main"; exit 1; }
echo -e "${GREEN}✓ Repository cloned and ready${NC}"
echo -e "${GREEN}✓ In directory: $(pwd)${NC}"

# Step 2: Create .env file with production credentials
echo -e "\n${BLUE}Step 2: Creating .env file...${NC}"
cat > .env << 'ENVEOF'
NODE_ENV=production
MAIL=info@coffeetocup.com
GENERATED_PASSWORD=your_password_here

# UPDATE THESE WITH YOUR REAL PRODUCTION CREDENTIALS
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
FACEBOOK_APP_ID=your_facebook_app_id_here
FACEBOOK_APP_SECRET=your_facebook_app_secret_here
DATABASE_URL=your_production_mongodb_url_here
ENVEOF
echo -e "${GREEN}✓ .env file created${NC}"
echo -e "${YELLOW}⚠ IMPORTANT: Edit .env with your real production credentials!${NC}"
echo -e "${YELLOW}  nano .env${NC}\n"

# Step 3: Install dependencies
echo -e "\n${BLUE}Step 3: Installing npm dependencies...${NC}"
npm install --production
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 4: Install PM2 globally (if not already installed)
echo -e "\n${BLUE}Step 4: Setting up PM2 process manager...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
fi
echo -e "${GREEN}✓ PM2 ready${NC}"

# Step 5: Stop existing app if running
echo -e "\n${BLUE}Step 5: Stopping existing app instance...${NC}"
pm2 stop coffeetocup 2>/dev/null || true
echo -e "${GREEN}✓ Old instance stopped${NC}"

# Step 6: Start app with PM2
echo -e "\n${BLUE}Step 6: Starting app with PM2...${NC}"
pm2 start app.js --name "coffeetocup" --env production
pm2 save
pm2 startup
echo -e "${GREEN}✓ App started and configured to auto-restart${NC}"

# Step 7: Configure Nginx
echo -e "\n${BLUE}Step 7: Configuring Nginx...${NC}"
sudo tee /etc/nginx/sites-available/default > /dev/null << 'NGINXEOF'
server {
    listen 80;
    listen [::]:80;
    server_name coffeetocup.com www.coffeetocup.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name coffeetocup.com www.coffeetocup.com;

    ssl_certificate /etc/letsencrypt/live/coffeetocup.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/coffeetocup.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINXEOF
echo -e "${GREEN}✓ Nginx configured${NC}"

# Step 8: Test and reload Nginx
echo -e "\n${BLUE}Step 8: Testing and reloading Nginx...${NC}"
sudo nginx -t
sudo systemctl reload nginx
echo -e "${GREEN}✓ Nginx reloaded${NC}"

# Step 9: Wait for app to start
echo -e "\n${BLUE}Step 9: Waiting for app to start...${NC}"
sleep 3

# Step 10: Verify everything
echo -e "\n${BLUE}Step 10: Verifying deployment...${NC}"

# Check PM2 status
echo -e "\n${YELLOW}PM2 Status:${NC}"
pm2 status

# Check if app is responding
echo -e "\n${YELLOW}Testing backend on localhost:5000:${NC}"
if curl -s http://127.0.0.1:5000 > /dev/null; then
    echo -e "${GREEN}✓ Backend is responding${NC}"
else
    echo -e "${YELLOW}⚠ Backend not responding yet, check logs: pm2 logs coffeetocup${NC}"
fi

# Test HTTPS
echo -e "\n${YELLOW}Testing HTTPS on coffeetocup.com:${NC}"
if curl -s https://coffeetocup.com > /dev/null 2>&1; then
    echo -e "${GREEN}✓ HTTPS is working${NC}"
else
    echo -e "${YELLOW}⚠ HTTPS not accessible yet, may need to wait a moment${NC}"
fi

# Final summary
echo -e "\n${GREEN}=========================================="
echo "✓ Deployment Complete!"
echo "==========================================${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Visit: https://coffeetocup.com"
echo "2. Test Google Login"
echo "3. Test Facebook Login"
echo ""
echo -e "${YELLOW}Useful commands:${NC}"
echo "  View logs:        pm2 logs coffeetocup"
echo "  Restart app:      pm2 restart coffeetocup"
echo "  Stop app:         pm2 stop coffeetocup"
echo "  Check status:     pm2 status"
echo ""
echo -e "${BLUE}Deployment script finished!${NC}\n"
