#!/bin/bash

# Setup Nginx Reverse Proxy on EC2 Instance
# This will run Nginx on the same server as your portfolio

set -e

echo "================================================"
echo "🚀 Setting up Nginx on EC2 Instance"
echo "================================================"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
   echo "Please run with sudo: sudo ./ec2-setup.sh"
   exit 1
fi

# Variables
DOMAIN="shrinidhi.space"
WWW_DOMAIN="www.shrinidhi.space"
EMAIL="shrinidhiupadhyaya00@gmail.com"

echo "📋 Configuration:"
echo "   Domain: $DOMAIN"
echo "   WWW Domain: $WWW_DOMAIN"
echo "   Backend: http://localhost:6969"
echo ""

# Update system
echo "📦 Updating system..."
apt update

# Install Nginx
echo "📥 Installing Nginx..."
apt install -y nginx

# Install Certbot
echo "🔐 Installing Certbot..."
apt install -y certbot python3-certbot-nginx

# Backup existing config
if [ -f /etc/nginx/sites-enabled/default ]; then
    echo "💾 Backing up default config..."
    mv /etc/nginx/sites-enabled/default /etc/nginx/sites-enabled/default.bak
fi

# Create Nginx config
echo "⚙️  Creating Nginx configuration..."
cat > /etc/nginx/sites-available/shrinidhi.space << 'EOF'
# HTTP Server - Will be auto-configured by Certbot
server {
    listen 80;
    listen [::]:80;
    
    server_name shrinidhi.space www.shrinidhi.space;
    
    # Access and Error Logs
    access_log /var/log/nginx/portfolio-access.log;
    error_log /var/log/nginx/portfolio-error.log;
    
    # Proxy to local Docker container
    location / {
        proxy_pass http://localhost:6969;
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
        
        # Buffering
        proxy_buffering on;
        proxy_buffer_size 4k;
        proxy_buffers 8 4k;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|pdf)$ {
        proxy_pass http://localhost:6969;
        add_header Cache-Control "public, max-age=86400";
    }
}
EOF

# Enable site
echo "🔗 Enabling site..."
ln -sf /etc/nginx/sites-available/shrinidhi.space /etc/nginx/sites-enabled/

# Test configuration
echo "✅ Testing Nginx configuration..."
nginx -t

# Restart Nginx
echo "🔄 Restarting Nginx..."
systemctl restart nginx
systemctl enable nginx

# Configure firewall (if ufw is installed)
if command -v ufw &> /dev/null; then
    echo "🔥 Configuring firewall..."
    ufw allow 'Nginx Full'
    echo "✅ UFW configured"
fi

echo ""
echo "================================================"
echo "✅ Nginx setup complete!"
echo "================================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. ✅ Make sure your Docker container is running on port 6969"
echo "   Check with: docker ps"
echo ""
echo "2. 🌐 Configure DNS in Hostinger:"
echo "   A Record: @ → 13.203.230.97"
echo "   A Record: www → 13.203.230.97"
echo ""
echo "3. ⏳ Wait 5-10 minutes for DNS to propagate"
echo "   Check with: dig shrinidhi.space"
echo ""
echo "4. 🔐 Install SSL certificate (run this command after DNS is working):"
echo "   sudo certbot --nginx -d shrinidhi.space -d www.shrinidhi.space --email $EMAIL --agree-tos --redirect"
echo ""
echo "5. ✅ Test auto-renewal:"
echo "   sudo certbot renew --dry-run"
echo ""
echo "================================================"
echo "🌐 Your site will be live at:"
echo "   http://shrinidhi.space (temporary, until SSL is set up)"
echo "   https://shrinidhi.space (after SSL setup)"
echo "================================================"
echo ""
