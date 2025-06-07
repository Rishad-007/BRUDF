# BRUDF Website V2 🎓

A modern, responsive website for the **Begum Rokeya University Debate Forum (BRUDF)** built with React, Vite, and Tailwind CSS.

## 🌟 Features

### ✨ Modern Design

- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- **Gradient Backgrounds** - Beautiful color schemes throughout
- **Smooth Animations** - GPU-accelerated transitions and hover effects
- **Glass Morphism** - Modern UI elements with backdrop blur effects

### 🎯 Key Sections

- **Hero Section** - Eye-catching landing with call-to-action
- **Executive Members Carousel** - Interactive slider showcasing 20+ committee members
- **Moderators Section** - Faculty profiles with achievements and specializations
- **Notice Board** - Cork board style with authentic bulletin aesthetics
- **Photo Gallery** - Masonry layout with manual "Load More Photos" button
- **Membership Form** - Hidden modal form with validation
- **Events Section** - Previous events with direct links to Facebook events
- **Video Section** - BRUDF promotional and event videos
- **Social Links** - Connect with BRUDF on social platforms

### 🚀 Technical Features

- **React 18** with modern hooks (useState, useEffect)
- **Vite** for lightning-fast development and building
- **Tailwind CSS** for utility-first styling
- **Responsive Grid System** - Adaptive layouts for all screen sizes
- **Interactive Carousel** - Auto-scroll with navigation controls
- **Form Validation** - Complete membership application system
- **Performance Optimized** - Hardware acceleration and smooth transitions

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd clubsitev2

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
clubsitev2/
├── src/
│   ├── App.jsx                    # Main application component
│   ├── index.jsx                  # React entry point
│   ├── index.css                  # Global styles and animations
│   ├── Navbar.jsx                 # Navigation with membership integration
│   ├── HomeSection.jsx            # Hero section with CTA
│   ├── ExecutiveMembersSection.jsx # Interactive member carousel
│   ├── ModeratorsSection.jsx      # Faculty profiles
│   ├── NoticeBoardSection.jsx     # Cork board style notices
│   ├── PhotoGallerySection.jsx    # Masonry photo gallery
│   ├── PreviousEventsSection.jsx  # Events showcase
│   ├── MembershipForm.jsx         # Modal membership form
│   ├── VideoSection.jsx           # Video content
│   └── SocialLinksSection.jsx     # Social media links
├── public/                        # Static assets (images, icons)
├── package.json                   # Dependencies and scripts
├── tailwind.config.js             # Tailwind configuration
├── vite.config.js                 # Vite configuration
└── README.md                      # This file
```

## 🎨 Design System

### Color Palette

- **Primary**: Indigo/Purple gradients
- **Secondary**: Orange/Red gradients
- **Accent**: Emerald/Teal for moderators
- **Neutrals**: Gray scale for text and backgrounds

### Typography

- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable font stack
- **Badges**: Pill-shaped with gradient backgrounds

### Components

- **Cards**: Rounded corners with hover animations
- **Buttons**: Gradient backgrounds with smooth transitions
- **Forms**: Modern input styling with validation states
- **Navigation**: Glass morphism with backdrop blur

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (1 column layout)
- **Tablet**: 768px - 1024px (2 column layout)
- **Desktop**: > 1024px (3 column layout)
- **Large**: > 1280px (Optimized spacing)

## 🔧 Configuration

### Tailwind CSS

Custom configuration includes:

- Extended color palette
- Custom animations
- Responsive breakpoints
- Typography scale

### Vite

Optimized for:

- Fast HMR (Hot Module Replacement)
- Asset optimization
- Code splitting
- Production builds

## 🚀 Deployment

### Render (Recommended)

Render is perfect for React applications with automatic deployments from GitHub. Follow these steps:

#### Step 1: Prepare Your Repository

```bash
# Ensure you're in the correct directory
cd /Users/rishad/React/clubsitev2/clubsitev2

# Add all files to git
git add .

# Commit your changes
git commit -m "Ready for Render deployment"

# Push to GitHub
git push origin main
```

#### Step 2: Configure package.json

Make sure your `package.json` has the correct build script:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

#### Step 3: Deploy on Render

1. **Sign up/Login** to [Render](https://render.com)
2. **Connect GitHub** - Link your GitHub account
3. **Create New Static Site**:
   - Click "New +" → "Static Site"
   - Select your repository: `Rishad-007/Brudf_site_V2`
   - Configure the following settings:

#### Step 4: Render Configuration

```yaml
# Render Build Settings
Name: brudf-website
Branch: main
Root Directory: clubsitev2
Build Command: npm install && npm run build
Publish Directory: dist
```

#### Step 5: Environment Variables (if needed)

```bash
# Add these in Render dashboard if using any APIs
NODE_ENV=production
VITE_API_URL=your_api_url_here
```

#### Step 6: Custom Domain (Optional)

```bash
# In Render dashboard:
# Settings → Custom Domains → Add Custom Domain
# Example: brudf.org or www.brudf.org
```

#### Step 7: Automatic Deployments

- ✅ **Auto-deploy** enabled by default
- Every push to `main` branch triggers new deployment
- Build logs available in Render dashboard
- Live URL: `https://your-site-name.onrender.com`

### Vercel (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify (Alternative)

```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

### GitHub Pages (Alternative)

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### 🔧 Render Troubleshooting

#### Common Issues & Solutions:

**Build Fails:**

```bash
# Check Node version (Render uses Node 18+ by default)
# Update package.json if needed:
"engines": {
  "node": ">=18.0.0"
}
```

**Static Assets Not Loading:**

```bash
# Ensure vite.config.js has correct base URL:
export default defineConfig({
  plugins: [react()],
  base: './',  // For relative paths
})
```

**Custom 404 Page:**

```bash
# Create public/_redirects file:
/*    /index.html   200
```

#### Performance Optimization for Render:

```bash
# Add to package.json for faster builds:
"scripts": {
  "build": "vite build --mode production"
}
```

### 📊 Deployment Comparison

| Platform     | Free Tier | Custom Domain | Build Time | Auto Deploy |
| ------------ | --------- | ------------- | ---------- | ----------- |
| **Render**   | ✅ Yes    | ✅ Yes        | ~2-3 min   | ✅ Yes      |
| Vercel       | ✅ Yes    | ✅ Yes        | ~1-2 min   | ✅ Yes      |
| Netlify      | ✅ Yes    | ✅ Yes        | ~1-2 min   | ✅ Yes      |
| GitHub Pages | ✅ Yes    | ✅ Yes        | ~3-5 min   | ✅ Yes      |

## 👥 Executive Members

The website features a comprehensive executive member system with:

- **Leadership Section**: President and General Secretary with full profiles
- **Executive Committee**: 18+ members in an interactive carousel
- **Responsive Display**: Adapts to show 1-3 members based on screen size
- **Auto-scroll**: 5-second intervals with manual navigation

## 📋 Membership System

Complete membership application featuring:

- **Personal Information**: Name, email, phone, address
- **Academic Details**: Institution, department, year
- **Interests**: Debate types and skill levels
- **Motivation**: Why join BRUDF
- **Form Validation**: Real-time validation with error states
- **Submission States**: Loading, success, and error handling

## 🎯 Performance Features

- **GPU Acceleration**: Hardware-accelerated animations
- **Lazy Loading**: Images load on demand
- **Code Splitting**: Optimized bundle sizes
- **Prefetching**: Critical resources preloaded
- **Responsive Images**: Optimized for different screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**BRUDF** - Begum Rokeya University Debate Forum

- Website: [brudf.edu](https://brudf.edu)
- Email: contact@brudf.edu
- GitHub: [@Rishad-007](https://github.com/Rishad-007)

## 🙏 Acknowledgments

- **BRUDF Members** - For their contributions and feedback
- **Faculty Moderators** - For their guidance and support
- **React Community** - For excellent documentation and tools
- **Tailwind CSS** - For the amazing utility-first framework

---

**Made with ❤️ for BRUDF by [Md. Rishad Nur](https://github.com/Rishad-007)**
