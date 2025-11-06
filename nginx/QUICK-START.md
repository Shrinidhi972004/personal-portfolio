# 🚀 Quick Setup Commands for New EC2 Instance

**New EC2 IP:** `13.203.230.97`

---

## 📋 Step 1: Configure DNS in Hostinger

Add these A records:

```
Type: A
Name: @
Points to: 13.203.230.97
TTL: 14400

Type: A
Name: www
Points to: 13.203.230.97
TTL: 14400
```

---

## 📋 Step 2: SSH to Your New EC2 Instance

```bash
ssh -i your-key.pem ubuntu@13.203.230.97
```

---

## 📋 Step 3: Clone Repository and Setup

```bash
# Clone the repository
git clone https://github.com/Shrinidhi972004/personal-portfolio.git
cd personal-portfolio

# Start Docker container
docker-compose up -d

# Verify it's running
docker ps
curl http://localhost:6969
```

---

## 📋 Step 4: Setup Nginx

```bash
# Navigate to nginx folder
cd nginx

# Make scripts executable
chmod +x *.sh

# Run EC2 setup script
sudo ./ec2-setup.sh
```

---

## 📋 Step 5: Verify DNS (Wait 5-10 mins)

```bash
# Check DNS
dig shrinidhi.space

# Should show: 13.203.230.97

# Test HTTP
curl http://shrinidhi.space
```

---

## 📋 Step 6: Install SSL Certificate

```bash
# Run SSL setup
sudo ./ssl-setup.sh

# OR manual command:
sudo certbot --nginx -d shrinidhi.space -d www.shrinidhi.space --email shrinidhiupadhyaya00@gmail.com --agree-tos --redirect
```

---

## 📋 Step 7: Verify HTTPS

```bash
# Test HTTPS
curl -I https://shrinidhi.space

# Open in browser
# https://shrinidhi.space
```

---

## ✅ AWS Security Group Rules

Make sure these ports are open:

| Type  | Port | Source    |
|-------|------|-----------|
| SSH   | 22   | Your IP   |
| HTTP  | 80   | 0.0.0.0/0 |
| HTTPS | 443  | 0.0.0.0/0 |

---

## 🎯 Expected Result

- ✅ http://shrinidhi.space → redirects to https://
- ✅ https://shrinidhi.space → Your portfolio 🔒
- ✅ https://www.shrinidhi.space → Works!

---

## 📞 Quick Troubleshooting

```bash
# Check Docker
docker ps

# Check Nginx
sudo systemctl status nginx
sudo nginx -t

# Check DNS
dig shrinidhi.space

# View logs
sudo tail -f /var/log/nginx/error.log
docker-compose logs -f
```

---

**All files updated with new IP: 13.203.230.97** ✅
