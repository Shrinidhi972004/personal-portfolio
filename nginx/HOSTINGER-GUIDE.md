# Complete Setup Guide for shrinidhi.space

## 🎯 Complete Setup Process

Follow these steps in order:

---

## 📍 **STEP 1: Configure DNS in Hostinger**

### Go to Hostinger Dashboard:
1. Login to https://hpanel.hostinger.com
2. Click on **Domains**
3. Find **shrinidhi.space** and click **Manage**
4. Click **DNS / Name Servers**
5. Click **DNS Records**

### Add These DNS Records:

**Record 1:**
```
Type: A
Name: @ (or leave empty, or use shrinidhi.space)
Points to: 13.203.230.97
TTL: 14400 (or Auto/Default)
```

**Record 2:**
```
Type: A
Name: www
Points to: 13.203.230.97
TTL: 14400 (or Auto/Default)
```

### Important Notes:
- **Delete** any old A records pointing to different IPs
- Keep MX records (for email) if you have them
- Keep CNAME records for other subdomains if needed
- Click **Save** or **Add Record** after each entry

### Verify DNS (after 5-10 minutes):
```bash
# Check if DNS is propagated
dig shrinidhi.space
dig www.shrinidhi.space

# Or use online tool
# https://dnschecker.org
```

---

## 📍 **STEP 2: Setup Nginx on EC2 Instance**

### Connect to Your EC2 Instance:
```bash
ssh -i your-key.pem ubuntu@13.203.230.97
```

### Make Sure Your Portfolio is Running:
```bash
# Check if Docker container is running
docker ps

# You should see your portfolio container on port 6969
# If not running, start it:
cd /path/to/portfolio
docker-compose up -d
```

### Run the Nginx Setup Script:

**Option A: If you have the files on EC2:**
```bash
# Navigate to portfolio directory
cd portfolio/nginx

# Run setup script
sudo ./ec2-setup.sh
```

**Option B: Manual Setup:**
```bash
# Update system
sudo apt update

# Install Nginx and Certbot
sudo apt install -y nginx certbot python3-certbot-nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/shrinidhi.space
```

Paste this configuration:
```nginx
server {
    listen 80;
    listen [::]:80;
    
    server_name shrinidhi.space www.shrinidhi.space;
    
    access_log /var/log/nginx/portfolio-access.log;
    error_log /var/log/nginx/portfolio-error.log;
    
    location / {
        proxy_pass http://localhost:6969;
        proxy_http_version 1.1;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/shrinidhi.space /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## 📍 **STEP 3: Configure AWS Security Group**

### In AWS Console:
1. Go to **EC2 Dashboard**
2. Click on your instance (`13.203.230.97`)
3. Click **Security** tab
4. Click on the **Security Group** link
5. Click **Edit Inbound Rules**

### Add These Rules:

| Type  | Protocol | Port Range | Source    | Description        |
|-------|----------|------------|-----------|-------------------|
| HTTP  | TCP      | 80         | 0.0.0.0/0 | Allow HTTP        |
| HTTPS | TCP      | 443        | 0.0.0.0/0 | Allow HTTPS       |
| Custom| TCP      | 6969       | 127.0.0.1 | Portfolio (local) |

**Keep existing SSH rule (port 22)!**

---

## 📍 **STEP 4: Test HTTP Access**

### Wait 5-10 minutes for DNS propagation, then test:

```bash
# Test from your local machine
curl -I http://shrinidhi.space
curl -I http://www.shrinidhi.space

# Or just open in browser
# http://shrinidhi.space
```

You should see your portfolio website!

---

## 📍 **STEP 5: Install SSL Certificate (HTTPS)**

### On Your EC2 Instance:

```bash
# Run Certbot
sudo certbot --nginx -d shrinidhi.space -d www.shrinidhi.space

# Follow the prompts:
# - Enter email: shrinidhiupadhyaya00@gmail.com
# - Agree to Terms of Service: Y
# - Share email with EFF: N (optional)
# - Redirect HTTP to HTTPS: Yes/2
```

### Test Auto-Renewal:
```bash
sudo certbot renew --dry-run
```

### Certbot will:
- ✅ Get free SSL certificate from Let's Encrypt
- ✅ Configure Nginx automatically
- ✅ Set up auto-renewal (runs twice daily)

---

## 📍 **STEP 6: Verify Everything Works**

### Test Your Website:
```bash
# HTTP (should redirect to HTTPS)
curl -I http://shrinidhi.space

# HTTPS
curl -I https://shrinidhi.space
curl -I https://www.shrinidhi.space
```

### Open in Browser:
- https://shrinidhi.space ✅
- https://www.shrinidhi.space ✅

Both should show your portfolio with the green lock icon! 🔒

---

## 🔍 **Troubleshooting**

### DNS Not Working?
```bash
# Check DNS propagation
dig shrinidhi.space
nslookup shrinidhi.space

# Check from multiple locations
# https://dnschecker.org
```

### Nginx Errors?
```bash
# Check error logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/portfolio-error.log

# Check config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Docker Container Not Running?
```bash
# Check status
docker ps -a

# Start container
cd /path/to/portfolio
docker-compose up -d

# Check logs
docker-compose logs -f
```

### Certbot Fails?
```bash
# Make sure DNS is working first!
dig shrinidhi.space

# Make sure port 80 is accessible
curl http://shrinidhi.space

# Check Nginx is running
sudo systemctl status nginx
```

---

## 📊 **Final Architecture**

```
Internet
   ↓
DNS: shrinidhi.space → 13.203.230.97
   ↓
AWS Security Group (Ports 80, 443)
   ↓
Nginx (Port 80/443)
   ↓
Docker Container (localhost:6969)
   ↓
Portfolio Website
```

---

## ✅ **Quick Checklist**

- [ ] DNS configured in Hostinger (A records for @ and www)
- [ ] DNS propagated (wait 5-10 minutes, check with dig)
- [ ] AWS Security Group allows ports 80 and 443
- [ ] Docker container running on port 6969
- [ ] Nginx installed and configured
- [ ] HTTP working (http://shrinidhi.space)
- [ ] SSL certificate installed (Certbot)
- [ ] HTTPS working (https://shrinidhi.space)
- [ ] Auto-renewal tested

---

## 🎉 **Success!**

Your portfolio will be live at:
- **https://shrinidhi.space**
- **https://www.shrinidhi.space**

With automatic HTTPS, SSL certificates, and professional DevOps setup! 🚀
