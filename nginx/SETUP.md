# Nginx Reverse Proxy Setup Guide

## 🚀 Quick Setup on Your Server

### Step 1: Install Nginx

```bash
# Update system
sudo apt update

# Install Nginx
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

---

### Step 2: Copy Nginx Configuration

```bash
# Copy the config file to Nginx sites-available
sudo cp nginx/portfolio.conf /etc/nginx/sites-available/shrinidhi.space

# Create symbolic link to sites-enabled
sudo ln -s /etc/nginx/sites-available/shrinidhi.space /etc/nginx/sites-enabled/

# Remove default config (optional)
sudo rm /etc/nginx/sites-enabled/default
```

---

### Step 3: Test Nginx Configuration

```bash
# Test configuration for syntax errors
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

---

### Step 4: Configure DNS (IMPORTANT!)

**Add these DNS records in your domain registrar (GoDaddy, Namecheap, etc.):**

| Type  | Name | Value                           | TTL  |
|-------|------|---------------------------------|------|
| A     | @    | `<YOUR-NGINX-SERVER-IP>`        | 3600 |
| A     | www  | `<YOUR-NGINX-SERVER-IP>`        | 3600 |

**Example:**
- If your Nginx server IP is `54.210.100.50`:
  - `shrinidhi.space` → `54.210.100.50`
  - `www.shrinidhi.space` → `54.210.100.50`

**Wait 5-10 minutes for DNS propagation.**

---

### Step 5: Install SSL Certificate (HTTPS)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate for your domain
sudo certbot --nginx -d shrinidhi.space -d www.shrinidhi.space

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose: Redirect HTTP to HTTPS (option 2)

# Test auto-renewal
sudo certbot renew --dry-run
```

---

### Step 6: Update Configuration (After Certbot)

After Certbot runs, it will automatically update the SSL paths. If needed, manually verify:

```bash
sudo nano /etc/nginx/sites-available/shrinidhi.space
```

Ensure these lines exist:
```nginx
ssl_certificate /etc/letsencrypt/live/shrinidhi.space/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/shrinidhi.space/privkey.pem;
```

---

### Step 7: Reload Nginx

```bash
sudo systemctl reload nginx
```

---

## 🌐 Access Your Website

After DNS propagates, access:
- **http://shrinidhi.space** → Redirects to HTTPS
- **https://shrinidhi.space** ✅
- **https://www.shrinidhi.space** ✅

All will proxy to: `http://3.110.202.187:6969`

---

## 🔥 Firewall Configuration

Make sure ports are open:

```bash
# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'

# Or manually:
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

**AWS Security Group Rules:**
- Port 80 (HTTP) - 0.0.0.0/0
- Port 443 (HTTPS) - 0.0.0.0/0

---

## 🔍 Troubleshooting

### Check Nginx Status
```bash
sudo systemctl status nginx
```

### View Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/nginx/portfolio-access.log

# Error logs
sudo tail -f /var/log/nginx/portfolio-error.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

### Test Backend Connection
```bash
# Test if your backend is accessible
curl http://3.110.202.187:6969

# Test from Nginx server
curl -I http://localhost
```

### Verify DNS Propagation
```bash
# Check DNS records
dig shrinidhi.space
dig www.shrinidhi.space

# Or use online tool
# https://dnschecker.org
```

### Restart Nginx
```bash
sudo systemctl restart nginx
```

---

## 📋 Architecture Flow

```
User Browser
    ↓
https://shrinidhi.space (Port 443)
    ↓
Nginx Reverse Proxy (Your Server)
    ↓
http://3.110.202.187:6969 (EC2 Backend)
    ↓
Portfolio Website (Docker Container)
```

---

## 🔐 Security Features Included

✅ **Automatic HTTP → HTTPS redirect**
✅ **TLS 1.2 & 1.3 support**
✅ **Security headers (HSTS, X-Frame-Options, etc.)**
✅ **SSL session caching**
✅ **Static asset caching**
✅ **Proxy headers for correct client IP**

---

## 🎯 One-Line Setup Script

```bash
# Run on your Nginx server (Ubuntu/Debian)
sudo apt update && sudo apt install nginx certbot python3-certbot-nginx -y && \
sudo cp nginx/portfolio.conf /etc/nginx/sites-available/shrinidhi.space && \
sudo ln -s /etc/nginx/sites-available/shrinidhi.space /etc/nginx/sites-enabled/ && \
sudo nginx -t && sudo systemctl reload nginx
```

Then run Certbot:
```bash
sudo certbot --nginx -d shrinidhi.space -d www.shrinidhi.space
```

---

## 📞 Need Help?

If you encounter issues:
1. Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
2. Verify DNS: `dig shrinidhi.space`
3. Test backend: `curl http://3.110.202.187:6969`
4. Check firewall: `sudo ufw status`

Your portfolio will be live at **https://shrinidhi.space** 🚀
