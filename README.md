# 🚀 DevOps & SRE Portfolio - Shrinidhi Upadhyaya

A modern, responsive portfolio website showcasing DevOps and SRE expertise. Built with **React + Vite + Tailwind CSS + Framer Motion** and featuring complete containerization and CI/CD pipeline.

## ✨ Features

- **🎨 Glass-morphism Design** with blue→purple→cyan gradient accents
- **🎭 Smooth Animations** via Framer Motion with scroll triggers
- **📱 Fully Responsive** layout optimized for all devices
- **✨ Animated Particles** background on hero section
- **📊 Real-time Scroll Progress** indicator
- **🔍 SEO Optimized** with meta tags and Open Graph
- **🐳 Docker Ready** with multi-stage Dockerfile
- **🔄 CI/CD Pipeline** with Jenkins automation

## 🛠️ Tech Stack

### Frontend
- ⚡ **Vite** - Lightning-fast build tool and dev server
- ⚛️ **React 18** - Modern component-based UI library
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **Framer Motion** - Production-ready motion library
- 🎯 **Lucide React** - Beautiful, customizable icons

### DevOps & Deployment
- � **Docker** - Multi-stage containerization
- 🐙 **Docker Compose** - Container orchestration
- 🔧 **Jenkins** - CI/CD pipeline automation
- ☁️ **AWS EC2** - Cloud deployment ready
- 🌐 **Nginx** - Production web server

## � Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Docker Deployment
```bash
# Build and run with Docker Compose (http://localhost:6969)
docker-compose up --build -d

# Or build manually
docker build -t portfolio:latest .
docker run -p 6969:6969 portfolio:latest

# Stop containers
docker-compose down
```

### Jenkins CI/CD
1. Configure Jenkins with Docker support
2. Create new Pipeline job
3. Point to this repository's `Jenkinsfile`
4. Pipeline will automatically: Clean → Clone → Build → Docker Build → Deploy

## 🎨 Project Highlights

### Real Projects Featured
- **🤖 Placements Notification Bot** - Telegram bot with AWS EC2 + Docker
- **📸 MERN Gallery with DevSecOps** - Full-stack app with security pipeline
- **📊 Unified Monitoring Platform** - Prometheus + Grafana observability
- **🔐 Passwordless Authentication** - WebAuthn security implementation

### Portfolio Sections
- **👋 Hero** - Animated introduction with particle background
- **👤 About** - Comprehensive DevOps/SRE background
- **⚙️ Skills** - Interactive tech stack showcase
- **🚀 Projects** - Filterable project cards with real GitHub links
- **📞 Contact** - Direct links to email, phone, GitHub, LinkedIn

## � Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── Hero.jsx        # Landing section with animations
│   │   ├── About.jsx       # Personal background
│   │   ├── Skills.jsx      # Technical skills grid
│   │   ├── Projects.jsx    # Project showcase
│   │   ├── Contact.jsx     # Contact information
│   │   └── ...
│   ├── data/
│   │   └── portfolio.js    # Projects and skills data
│   ├── styles.css          # Global styles and utilities
│   └── App.jsx            # Main application
├── public/                 # Static assets
├── Dockerfile             # Multi-stage container build
├── docker-compose.yml     # Container orchestration
├── Jenkinsfile           # CI/CD pipeline definition
└── vars/                 # Jenkins pipeline utilities
```

## 🔧 Customization

### Update Personal Information
1. **Contact Details**: Edit `src/components/Contact.jsx`
2. **Projects**: Modify `src/data/portfolio.js`
3. **Skills**: Update skills array in `src/data/portfolio.js`
4. **Profile Photo**: Replace `public/profile.png`
5. **Resume**: Replace `public/devops_resume.pdf`

### Environment Configuration
- **Development**: Runs on port `5173`
- **Production**: Docker serves on port `6969`
- **Customization**: Update ports in `docker-compose.yml`

## 🌐 Deployment Options

### Cloud Platforms
```bash
# Netlify
npm run build && netlify deploy --prod --dir=dist

# Vercel
npm run build && vercel --prod

# AWS EC2 with Docker
docker-compose up -d
```

### Self-Hosted
```bash
# Using PM2
npm run build && pm2 serve dist 6969 --spa

# Using Nginx
# Copy dist/ to /var/www/html and configure nginx
```

## 🎯 Performance & SEO

- ⚡ **Lighthouse Score**: 95+ Performance
- 🔍 **SEO Optimized**: Meta tags, structured data
- 📱 **Mobile-First**: Responsive design
- ⚙️ **Optimized Build**: Tree-shaking, code splitting
- 🖼️ **Image Optimization**: Compressed assets
- 🚀 **Fast Loading**: Vite bundling optimization

## 📞 Contact Information

- **📧 Email**: shrinidhiupadhyaya00@gmail.com
- **📱 Phone**: +91 7204200386
- **💻 GitHub**: [Shrinidhi972004](https://github.com/Shrinidhi972004)
- **💼 LinkedIn**: [shrinidhi-upadhyaya](https://linkedin.com/in/shrinidhi-upadhyaya-82114a26a/)

---

### 🎉 **Built with ❤️ using DevOps mindset and modern web technologies**

*Ready for production deployment with enterprise-grade CI/CD pipeline*
