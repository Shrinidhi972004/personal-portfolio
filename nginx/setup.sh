#!/bin/bash

# Nginx Reverse Proxy Setup Script for shrinidhi.space
# Run this on your Nginx server (not the EC2 instance running the app)

set -e  # Exit on error

echo "================================================"
echo "🚀 Setting up Nginx Reverse Proxy"
echo "================================================"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
   echo "❌ Please run as root or with sudo"
   exit 1
fi

# Variables
DOMAIN="shrinidhi.space"
WWW_DOMAIN="www.shrinidhi.space"
BACKEND_URL="http://13.203.230.97:6969"
EMAIL="shrinidhiupadhyaya00@gmail.com"

echo "📋 Configuration:"
echo "   Domain: $DOMAIN"
echo "   WWW Domain: $WWW_DOMAIN"
echo "   Backend: $BACKEND_URL"
echo ""

# Step 1: Update system
echo "📦 Updating system packages..."
apt update -qq

# Step 2: Install Nginx
echo "📥 Installing Nginx..."
apt install -y nginx

# Step 3: Install Certbot
echo "🔐 Installing Certbot for SSL..."
apt install -y certbot python3-certbot-nginx

# Step 4: Create Nginx config (temporary without SSL)
echo "⚙️  Creating Nginx configuration..."
cat > /etc/nginx/sites-available/$DOMAIN << 'EOF'
# Temporary HTTP configuration
server {
    listen 80;
    listen [::]:80;
    
    server_name shrinidhi.space www.shrinidhi.space;
    
    # Access and Error Logs
    access_log /var/log/nginx/portfolio-access.log;
    error_log /var/log/nginx/portfolio-error.log;
    
    # Proxy to your EC2 instance
    location / {
        proxy_pass http://13.203.230.97:6969;
        proxy_http_version 1.1;
        
        # Proxy Headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $server_name;
        
        # WebSocket Support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://13.203.230.97:6969;
        add_header Cache-Control "public, max-age=86400";
    }
}
EOF

# Step 5: Enable site
echo "🔗 Enabling site..."
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/

# Remove default site if exists
if [ -f /etc/nginx/sites-enabled/default ]; then
    echo "🗑️  Removing default site..."
    rm /etc/nginx/sites-enabled/default
fi

# Step 6: Test Nginx configuration
echo "✅ Testing Nginx configuration..."
nginx -t

# Step 7: Restart Nginx
echo "🔄 Restarting Nginx..."
systemctl restart nginx
systemctl enable nginx

# Step 8: Configure firewall
echo "🔥 Configuring firewall..."
if command -v ufw &> /dev/null; then
    ufw allow 'Nginx Full'
    ufw --force enable
    echo "✅ UFW configured"
else
    echo "⚠️  UFW not found, skipping firewall configuration"
fi

echo ""
echo "================================================"
echo "✅ Basic Nginx setup complete!"
echo "================================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Configure DNS Records:"
echo "   Add these A records in your domain registrar:"
echo "   - shrinidhi.space → <THIS-SERVER-IP>"
echo "   - www.shrinidhi.space → <THIS-SERVER-IP>"
echo ""
echo "2. Wait 5-10 minutes for DNS propagation"
echo ""
echo "3. Install SSL certificate (run after DNS is configured):"
echo "   sudo certbot --nginx -d $DOMAIN -d $WWW_DOMAIN --email $EMAIL --agree-tos --no-eff-email --redirect"
echo ""
echo "4. Test auto-renewal:"
echo "   sudo certbot renew --dry-run"
echo ""
echo "================================================"
echo "📊 Current Status:"
echo "================================================"
systemctl status nginx --no-pager
echo ""
echo "🌐 Test HTTP access: http://$(hostname -I | awk '{print $1}')"
echo "🌐 After DNS + SSL: https://$DOMAIN"
echo ""
