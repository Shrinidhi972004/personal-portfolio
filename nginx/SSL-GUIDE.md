# SSL/TLS (HTTPS) Setup Guide

## 🔐 Setting Up HTTPS for shrinidhi.space

---

## ✅ **Prerequisites Checklist**

Before running SSL setup, make sure:

- [ ] **DNS is configured** in Hostinger (A records pointing to your EC2 IP)
- [ ] **DNS has propagated** (wait 5-10 minutes after DNS setup)
- [ ] **Nginx is installed** and running on your EC2
- [ ] **Portfolio is running** on port 6969
- [ ] **Ports 80 and 443 are open** in AWS Security Group

---

## 📍 **STEP 1: Verify DNS is Working**

### From Your Local Machine:
```bash
# Check if domain resolves to your EC2 IP
dig shrinidhi.space

# You should see: shrinidhi.space. IN A 3.110.202.187

# Or use nslookup
nslookup shrinidhi.space

# Or online tool
# https://dnschecker.org
```

### Test HTTP Access:
```bash
# Should show your portfolio
curl http://shrinidhi.space

# Or open in browser
# http://shrinidhi.space
```

**If DNS doesn't work, go back to Hostinger and configure it first!**

---

## 📍 **STEP 2: Check AWS Security Group**

### Make Sure These Ports are Open:

1. Go to **AWS Console** → **EC2** → **Security Groups**
2. Find your instance's security group
3. **Edit Inbound Rules** and add:

| Type  | Protocol | Port | Source    | Description |
|-------|----------|------|-----------|------------|
| HTTP  | TCP      | 80   | 0.0.0.0/0 | HTTP       |
| HTTPS | TCP      | 443  | 0.0.0.0/0 | HTTPS      |
| SSH   | TCP      | 22   | Your IP   | SSH        |

**Both port 80 and 443 are required for SSL certificate generation!**

---

## 📍 **STEP 3: Run SSL Setup Script**

### SSH to Your EC2 Instance:
```bash
ssh -i your-key.pem ubuntu@3.110.202.187
```

### Option A: Automated Setup (Recommended)

```bash
# Navigate to nginx folder
cd portfolio/nginx

# Run the SSL setup script
sudo ./ssl-setup.sh
```

The script will:
- ✅ Check if Nginx and Certbot are installed
- ✅ Verify DNS configuration
- ✅ Check firewall settings
- ✅ Get SSL certificate from Let's Encrypt
- ✅ Configure Nginx automatically
- ✅ Set up auto-renewal
- ✅ Test everything

---

### Option B: Manual Setup

If you don't have the script, run these commands:

```bash
# 1. Install Certbot
sudo apt update
sudo apt install -y certbot python3-certbot-nginx

# 2. Run Certbot
sudo certbot --nginx -d shrinidhi.space -d www.shrinidhi.space

# Follow the prompts:
# Email: shrinidhiupadhyaya00@gmail.com
# Agree to ToS: Y
# Share email: N
# Redirect HTTP to HTTPS: 2 (Yes)

# 3. Test auto-renewal
sudo certbot renew --dry-run

# 4. Reload Nginx
sudo systemctl reload nginx
```

---

## 📍 **STEP 4: Verify HTTPS is Working**

### Test in Browser:
1. Open: **https://shrinidhi.space**
2. Check for **green lock icon** 🔒
3. Click the lock to see certificate details

### Test in Terminal:
```bash
# Should return 200 OK with SSL
curl -I https://shrinidhi.space

# HTTP should redirect to HTTPS
curl -I http://shrinidhi.space
# Should show: Location: https://shrinidhi.space
```

---

## 🔧 **Troubleshooting**

### Problem: "Domain doesn't resolve"

**Solution:**
```bash
# Check DNS
dig shrinidhi.space

# If no result, configure DNS in Hostinger:
# A Record: @ → 3.110.202.187
# A Record: www → 3.110.202.187

# Wait 5-10 minutes and try again
```

---

### Problem: "Port 80/443 connection refused"

**Solution:**
```bash
# Check if Nginx is running
sudo systemctl status nginx

# If not running
sudo systemctl start nginx

# Check AWS Security Group
# Make sure ports 80 and 443 are open to 0.0.0.0/0
```

---

### Problem: "Certbot failed to authenticate"

**Solution:**
```bash
# 1. Make sure DNS is working
dig shrinidhi.space

# 2. Make sure Nginx is running
sudo systemctl status nginx

# 3. Test Nginx config
sudo nginx -t

# 4. Check firewall
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# 5. Check Certbot logs
sudo tail -f /var/log/letsencrypt/letsencrypt.log
```

---

### Problem: "Too many certificates issued"

**Solution:**
Let's Encrypt has a limit of 5 certificates per week per domain.

```bash
# Check current certificates
sudo certbot certificates

# If you hit the limit, wait a few days or use staging mode for testing:
sudo certbot --nginx --staging -d shrinidhi.space -d www.shrinidhi.space
```

---

### Problem: "Certificate expired"

**Solution:**
```bash
# Renew manually
sudo certbot renew

# Check auto-renewal
sudo certbot renew --dry-run

# Check renewal timer
sudo systemctl status certbot.timer

# Enable timer if not running
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

---

## 📋 **Manual Nginx HTTPS Configuration**

If Certbot doesn't auto-configure Nginx, edit manually:

```bash
sudo nano /etc/nginx/sites-available/shrinidhi.space
```

Add this configuration:

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name shrinidhi.space www.shrinidhi.space;
    return 301 https://$server_name$request_uri;
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    
    server_name shrinidhi.space www.shrinidhi.space;
    
    # SSL Certificate
    ssl_certificate /etc/letsencrypt/live/shrinidhi.space/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/shrinidhi.space/privkey.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    
    # Proxy to your portfolio
    location / {
        proxy_pass http://localhost:6969;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Test and reload:
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔄 **Certificate Auto-Renewal**

Certbot automatically sets up renewal. Check it:

```bash
# Check renewal timer
sudo systemctl status certbot.timer

# Test renewal
sudo certbot renew --dry-run

# Check certificate expiry
sudo certbot certificates
```

Certificates auto-renew **60 days before expiry** (they last 90 days).

---

## ✅ **Success Checklist**

After successful setup:

- [ ] https://shrinidhi.space loads with green lock 🔒
- [ ] https://www.shrinidhi.space works
- [ ] http://shrinidhi.space redirects to https://
- [ ] Certificate is valid (check browser)
- [ ] Auto-renewal is configured
- [ ] No browser warnings

---

## 🎉 **You're Done!**

Your portfolio is now secure with HTTPS! 🚀

**Your site:** https://shrinidhi.space

**Certificate details:**
- Issuer: Let's Encrypt
- Valid for: 90 days
- Auto-renews: Every 60 days
- Free: Forever!

---

## 📞 **Quick Commands Reference**

```bash
# Get/Renew certificate
sudo certbot --nginx -d shrinidhi.space -d www.shrinidhi.space

# Check certificates
sudo certbot certificates

# Renew manually
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run

# Check Nginx config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# View SSL logs
sudo tail -f /var/log/letsencrypt/letsencrypt.log

# Check certificate expiry
echo | openssl s_client -servername shrinidhi.space -connect shrinidhi.space:443 2>/dev/null | openssl x509 -noout -dates
```
