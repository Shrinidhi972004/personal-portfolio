#!/bin/bash

# SSL/TLS Certificate Setup for shrinidhi.space
# Run this on your EC2 instance after DNS is configured

set -e

echo "================================================"
echo "🔐 SSL/TLS Certificate Setup"
echo "================================================"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
   echo "Please run with sudo: sudo ./ssl-setup.sh"
   exit 1
fi

DOMAIN="shrinidhi.space"
WWW_DOMAIN="www.shrinidhi.space"
EMAIL="shrinidhiupadhyaya00@gmail.com"

echo "📋 Configuration:"
echo "   Domain: $DOMAIN"
echo "   WWW Domain: $WWW_DOMAIN"
echo "   Email: $EMAIL"
echo ""

# Step 1: Check if Nginx is installed
echo "🔍 Checking Nginx installation..."
if ! command -v nginx &> /dev/null; then
    echo "❌ Nginx is not installed!"
    echo "Please run: sudo apt install nginx"
    exit 1
fi
echo "✅ Nginx is installed"

# Step 2: Check if Certbot is installed
echo "🔍 Checking Certbot installation..."
if ! command -v certbot &> /dev/null; then
    echo "📥 Installing Certbot..."
    apt update
    apt install -y certbot python3-certbot-nginx
fi
echo "✅ Certbot is installed"

# Step 3: Check DNS resolution
echo ""
echo "🌐 Checking DNS configuration..."
echo "   Checking $DOMAIN..."
if host $DOMAIN > /dev/null 2>&1; then
    IP=$(host $DOMAIN | grep "has address" | awk '{print $4}')
    echo "   ✅ $DOMAIN resolves to: $IP"
else
    echo "   ❌ $DOMAIN does not resolve!"
    echo ""
    echo "   Please configure DNS in Hostinger first:"
    echo "   A Record: @ → 13.203.230.97"
    echo "   A Record: www → 13.203.230.97"
    echo ""
    echo "   Wait 5-10 minutes after DNS configuration and try again."
    exit 1
fi

echo "   Checking $WWW_DOMAIN..."
if host $WWW_DOMAIN > /dev/null 2>&1; then
    WWW_IP=$(host $WWW_DOMAIN | grep "has address" | awk '{print $4}')
    echo "   ✅ $WWW_DOMAIN resolves to: $WWW_IP"
else
    echo "   ⚠️  $WWW_DOMAIN does not resolve!"
    echo "   Continuing anyway..."
fi

# Step 4: Check if port 80 is accessible
echo ""
echo "🔍 Checking if Nginx is running..."
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx is running"
else
    echo "❌ Nginx is not running!"
    echo "Starting Nginx..."
    systemctl start nginx
fi

# Step 5: Test Nginx configuration
echo ""
echo "🔍 Testing Nginx configuration..."
if nginx -t 2>&1 | grep -q "successful"; then
    echo "✅ Nginx configuration is valid"
else
    echo "❌ Nginx configuration has errors!"
    nginx -t
    exit 1
fi

# Step 6: Check firewall
echo ""
echo "🔥 Checking firewall..."
if command -v ufw &> /dev/null; then
    if ufw status | grep -q "80.*ALLOW"; then
        echo "✅ Port 80 is allowed"
    else
        echo "⚠️  Port 80 not allowed, opening it..."
        ufw allow 80/tcp
    fi
    
    if ufw status | grep -q "443.*ALLOW"; then
        echo "✅ Port 443 is allowed"
    else
        echo "⚠️  Port 443 not allowed, opening it..."
        ufw allow 443/tcp
    fi
else
    echo "⚠️  UFW not installed, make sure AWS Security Group allows ports 80 and 443"
fi

# Step 7: Run Certbot
echo ""
echo "================================================"
echo "🚀 Running Certbot to get SSL certificate..."
echo "================================================"
echo ""
echo "This will:"
echo "  1. Get a free SSL certificate from Let's Encrypt"
echo "  2. Automatically configure Nginx"
echo "  3. Set up auto-renewal"
echo "  4. Redirect HTTP to HTTPS"
echo ""

# Run Certbot with automatic Nginx configuration
certbot --nginx \
    -d $DOMAIN \
    -d $WWW_DOMAIN \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --redirect \
    --non-interactive

# Check if Certbot succeeded
if [ $? -eq 0 ]; then
    echo ""
    echo "================================================"
    echo "✅ SSL Certificate Installed Successfully!"
    echo "================================================"
    echo ""
    
    # Step 8: Test auto-renewal
    echo "🔄 Testing certificate auto-renewal..."
    certbot renew --dry-run
    
    if [ $? -eq 0 ]; then
        echo "✅ Auto-renewal is configured correctly"
    else
        echo "⚠️  Auto-renewal test failed, but certificate is installed"
    fi
    
    # Step 9: Reload Nginx
    echo ""
    echo "🔄 Reloading Nginx..."
    systemctl reload nginx
    
    echo ""
    echo "================================================"
    echo "🎉 SUCCESS! Your site is now secure!"
    echo "================================================"
    echo ""
    echo "🌐 Your website is now accessible at:"
    echo "   https://$DOMAIN"
    echo "   https://$WWW_DOMAIN"
    echo ""
    echo "📋 Certificate Information:"
    certbot certificates
    echo ""
    echo "🔄 Auto-renewal runs twice daily automatically"
    echo ""
    echo "📊 Next Steps:"
    echo "   1. Visit: https://$DOMAIN"
    echo "   2. Verify the green lock icon in your browser"
    echo "   3. Test: http://$DOMAIN (should redirect to https://)"
    echo ""
else
    echo ""
    echo "================================================"
    echo "❌ Certbot failed!"
    echo "================================================"
    echo ""
    echo "Common issues:"
    echo "  1. DNS not configured correctly"
    echo "  2. Port 80/443 blocked in firewall/security group"
    echo "  3. Nginx not configured properly"
    echo "  4. Domain not pointing to this server"
    echo ""
    echo "Debug steps:"
    echo "  1. Check DNS: dig $DOMAIN"
    echo "  2. Check Nginx: sudo nginx -t"
    echo "  3. Check firewall: sudo ufw status"
    echo "  4. Check logs: sudo tail -f /var/log/letsencrypt/letsencrypt.log"
    echo ""
    exit 1
fi
