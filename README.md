# DevOps & SRE Portfolio

A modern, responsive portfolio website for DevOps Engineers and SRE professionals. Built with **Vite + React + Tailwind CSS + Framer Motion**.

## 🚀 Features

- **Dark/Light Theme Toggle** with persistence
- **Glass-morphism Design** with gradient accents
- **Smooth Animations** via Framer Motion
- **Responsive Layout** optimized for all devices
- **Animated Particles** background on hero section
- **Real-time Scroll Progress** indicator
- **SEO Optimized** with meta tags and Open Graph

## 🛠️ Tech Stack

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 18** - Component-based UI library
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **Framer Motion** - Animation library
- 🎯 **Lucide React** - Beautiful icons
- 🔧 **React Tilt** - 3D hover effects

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Customization

1. **Personal Info**: Update contact details in `src/components/Contact.jsx`
2. **Projects**: Modify `src/data/portfolio.js` with your projects
3. **Skills**: Update skills array in `src/data/portfolio.js`
4. **Certifications**: Add your certifications in `src/data/portfolio.js`
5. **Avatar**: Replace `avatar-placeholder.png` with your photo

## 🚀 Deployment

### Netlify
```bash
npm run build
# Drag & drop `dist` folder to Netlify
```

### Vercel
```bash
npm run build
vercel --prod
```

### GitHub Pages
```bash
npm run build
# Deploy `dist` folder contents to gh-pages branch
```

## 📝 Project Structure

```
src/
├── components/          # React components
├── data/               # Portfolio data
├── styles.css          # Global styles
└── App.jsx            # Main app component
```

## 🎯 SEO & Performance

- Optimized for **Lighthouse** scores
- **Meta tags** for social sharing
- **Fast loading** with Vite bundling
- **Mobile-first** responsive design

---

**Built with ❤️ using DevOps mindset**
