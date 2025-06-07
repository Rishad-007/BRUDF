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

### 📋 Requirements

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** for cloning the repository
- A modern web browser (Chrome, Firefox, Safari, Edge)

### 🔧 Node.js Installation Guide

If you don't have Node.js installed, follow these steps:

#### Windows

1. **Download Node.js**:
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the **LTS (Long Term Support)** version
   - Run the `.msi` installer file

2. **Verify Installation**:
   ```bash
   # Open Command Prompt or PowerShell
   node --version
   npm --version
   ```

3. **Alternative - Using Chocolatey**:
   ```bash
   # Install Chocolatey first, then:
   choco install nodejs
   ```

#### macOS

1. **Download Node.js**:
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the **LTS** version
   - Run the `.pkg` installer file

2. **Alternative - Using Homebrew**:
   ```bash
   # Install Homebrew first, then:
   brew install node
   ```

3. **Alternative - Using MacPorts**:
   ```bash
   sudo port install nodejs18 +universal
   ```

4. **Verify Installation**:
   ```bash
   node --version
   npm --version
   ```

#### Linux (Ubuntu/Debian)

1. **Using Package Manager**:
   ```bash
   # Update package index
   sudo apt update
   
   # Install Node.js and npm
   sudo apt install nodejs npm
   
   # Verify installation
   node --version
   npm --version
   ```

2. **Using NodeSource Repository** (Recommended):
   ```bash
   # Add NodeSource repository
   curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
   
   # Install Node.js
   sudo apt-get install -y nodejs
   ```

#### Linux (CentOS/RHEL/Fedora)

```bash
# For CentOS/RHEL
sudo yum install nodejs npm

# For Fedora
sudo dnf install nodejs npm

# Verify installation
node --version
npm --version
```

#### Using Node Version Manager (NVM) - Recommended for Developers

NVM allows you to install and switch between multiple Node.js versions:

1. **Install NVM**:
   ```bash
   # macOS/Linux
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   
   # Restart terminal or run:
   source ~/.bashrc
   ```

2. **Install Latest LTS Node.js**:
   ```bash
   nvm install --lts
   nvm use --lts
   nvm alias default lts/*
   ```

3. **Verify Installation**:
   ```bash
   node --version
   npm --version
   ```

#### Troubleshooting Node.js Installation

**Permission Issues on macOS/Linux**:
```bash
# Fix npm permissions
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
```

**Windows Path Issues**:
```bash
# Add Node.js to PATH manually if needed
# Add: C:\Program Files\nodejs\ to your PATH environment variable
```

**Version Conflicts**:
```bash
# Check installed versions
node --version
npm --version

# Update npm to latest
npm install -g npm@latest
```

### 📊 Node.js Version Compatibility

| Node.js Version | npm Version | Status | Recommended |
|----------------|-------------|---------|-------------|
| 18.x.x         | 9.x.x       | ✅ LTS  | ✅ Yes      |
| 16.x.x         | 8.x.x       | ✅ LTS  | ✅ Yes      |
| 14.x.x         | 6.x.x       | ⚠️ End of Life | ❌ No       |

**Recommended**: Use Node.js 18.x (LTS) for best compatibility and performance.

### 📦 Dependencies

This project uses the following key dependencies:

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS post-processor
- **Autoprefixer** - CSS vendor prefixing

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Rishad-007/clubsitev2.git

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

### Detailed Setup Instructions

#### 1. Clone the Repository

```bash
git clone https://github.com/Rishad-007/clubsitev2.git
cd clubsitev2
```

#### 2. Install Dependencies

Make sure you have Node.js installed (v16 or higher):

```bash
# Check Node.js version
node --version

# Install project dependencies
npm install
```

#### 3. Run the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another available port). The development server includes:
- ⚡ Hot Module Replacement (HMR)
- 🔧 Auto-reload on file changes
- 🎯 Error overlay for debugging

#### 4. Build for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

The production files will be generated in the `dist/` folder.

### 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts development server with HMR |
| `npm run build` | Creates optimized production build |
| `npm run preview` | Preview production build locally |

### 🌐 Deployment

#### Deploy to Netlify
1. Run `npm run build`
2. Upload the `dist/` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

#### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy automatically on git push

### 🔍 Troubleshooting

#### Common Issues

**Node.js Version Error:**
```bash
# Update Node.js to latest LTS version
nvm install --lts
nvm use --lts
```

**Permission Errors (macOS/Linux):**
```bash
# Use npm with safe permissions
npm install --unsafe-perm=true --allow-root
```

**Port Already in Use:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
# Or start on different port
npm run dev -- --port 3000
```

**Dependencies Issues:**
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
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

We welcome contributions to improve the BRUDF website! Here's how you can help:

### How to Contribute

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/clubsitev2.git
   cd clubsitev2
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Follow the existing code style
   - Test your changes thoroughly
   - Update documentation if needed

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: your descriptive commit message"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Describe your changes clearly

### Development Guidelines

- **Code Style**: Follow existing patterns and use Prettier for formatting
- **Commit Messages**: Use descriptive messages with prefixes (Add:, Fix:, Update:)
- **Testing**: Test on multiple screen sizes and browsers
- **Performance**: Ensure animations are smooth and images are optimized

## 📱 Browser Support

This website supports all modern browsers:

- ✅ Chrome (80+)
- ✅ Firefox (80+)
- ✅ Safari (14+)
- ✅ Edge (80+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

### BRUDF Contact Information

- **Email**: [brudf.official@email.com](mailto:brudf.official@email.com)
- **Facebook**: [BRUDF Official Page](https://www.facebook.com/brudf.2016)
- **University**: Begum Rokeya University, Rangpur

### Developer Contact

- **Name**: Rishad Nur
- **Email**: [rishad.nur007@gmail.com](mailto:rishad.nur007@gmail.com)
- **Facebook**: [fb.com/rishad.nur](https://fb.com/rishad.nur)
- **GitHub**: [github.com/Rishad-007](https://github.com/Rishad-007)

### Technical Support

For technical issues with the website:

1. **Check the Issues**: Look at [GitHub Issues](https://github.com/Rishad-007/clubsitev2/issues)
2. **Create New Issue**: If your problem isn't listed, create a new issue
3. **Direct Contact**: Email [rishad.nur007@gmail.com](mailto:rishad.nur007@gmail.com) for urgent technical issues
4. **Community Help**: Ask in discussions or reach out to maintainers

### Project Maintainers

- **Lead Developer**: [Rishad Nur](https://github.com/Rishad-007)
- **BRUDF Committee**: [Committee Members](https://www.facebook.com/brudf.2016)

## 🚀 Future Enhancements

### Planned Features

- [ ] **Admin Dashboard** - Content management system
- [ ] **Event Registration** - Online event signup
- [ ] **Member Portal** - Exclusive member content
- [ ] **Blog Section** - Articles and updates
- [ ] **Newsletter** - Email subscription system
- [ ] **Multi-language** - Bengali and English support
- [ ] **Dark Mode** - Theme switcher
- [ ] **PWA Features** - Offline functionality

### Contributions Welcome

We're looking for help with:
- UI/UX improvements
- Performance optimization
- Mobile responsiveness
- Accessibility features
- Content management
- Testing and bug fixes

## 🙏 Acknowledgments

### Credits

- **BRUDF Committee** - Content and requirements
- **Begum Rokeya University** - Institutional support
- **React Community** - Open source libraries
- **Tailwind CSS** - Styling framework
- **Vite Team** - Build tool
- **Contributors** - All who helped improve this project

### Special Thanks

- Faculty moderators for their guidance
- Students who provided feedback
- Photography contributors
- Beta testers and reviewers

---

<div align="center">

**Made with ❤️ for the BRUDF Community**

[🌟 Star this repo](https://github.com/Rishad-007/clubsitev2) if you found it helpful!

[📝 Report Issues](https://github.com/Rishad-007/clubsitev2/issues) • [💡 Request Features](https://github.com/Rishad-007/clubsitev2/issues) • [🤝 Contribute](https://github.com/Rishad-007/clubsitev2/pulls)

</div>
