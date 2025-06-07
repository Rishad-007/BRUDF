# BRUDF Membership Registration System

## Overview

This is a complete membership registration system for BRUDF (Begum Rokeya University Debate Forum) that includes:

- Public membership registration form
- Admin panel to view and manage submitted applications
- Simple CSV export functionality
- Responsive design with beautiful UI

## Features

### For Users:

- Fill out membership registration form
- Submit applications with personal and academic information
- Select areas of interest
- Mobile-responsive design

### For Admins:

- Secure admin panel with password protection
- View all submitted member applications
- Export member data to CSV
- Delete member records
- Access via keyboard shortcut (Ctrl+Shift+A) or footer button

## Technical Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express.js
- **Storage**: In-memory (simple but works for small scale)
- **Deployment**: Render

## Local Development

1. **Install dependencies:**

```bash
npm install
```

2. **Run development server:**

```bash
# Terminal 1: Start backend server
npm run dev:server

# Terminal 2: Start frontend development
npm run dev
```

3. **Build for production:**

```bash
npm run build
```

## Deployment on Render

### Option 1: Automatic Deployment (Recommended)

1. **Push to GitHub:**

```bash
git add .
git commit -m "Deploy BRUDF membership system"
git push origin main
```

2. **Deploy on Render:**
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository
   - Create a new Web Service
   - Use these settings:
     - **Build Command**: `npm run render-build`
     - **Start Command**: `npm start`
     - **Environment Variables**:
       - `NODE_ENV`: `production`
       - `ADMIN_PASSWORD`: `brudf2024admin` (or your custom password)

### Option 2: Manual Configuration

If you prefer manual setup:

1. **Create Web Service on Render**
2. **Repository**: Connect your GitHub repo
3. **Branch**: `main`
4. **Root Directory**: Leave blank
5. **Runtime**: `Node`
6. **Build Command**: `npm install && npm run build`
7. **Start Command**: `npm start`
8. **Environment Variables**:
   ```
   NODE_ENV=production
   ADMIN_PASSWORD=brudf2024admin
   ```

## Admin Access

### Default Credentials:

- **Password**: `brudf2024admin`

### Access Methods:

1. **Keyboard Shortcut**: Press `Ctrl+Shift+A` (or `Cmd+Shift+A` on Mac)
2. **Footer Button**: Click "Admin" in the website footer
3. **Direct URL**: Add `/admin` to your website URL (requires admin button click first)

### Admin Features:

- View all member registrations
- Export data to CSV
- Delete member records
- Real-time submission counter

## Security Notes

- Admin password is set via environment variable
- Simple password protection (suitable for small organizations)
- For production, consider implementing JWT tokens or OAuth

## Customization

### Change Admin Password:

1. Update the `ADMIN_PASSWORD` environment variable on Render
2. Or modify the `.env` file for local development

### Modify Form Fields:

- Edit `src/MembershipForm.jsx`
- Update the `formData` state object
- Add corresponding form inputs

### Styling:

- Built with Tailwind CSS
- Modify classes in component files
- Responsive design included

## File Structure

```
├── server/
│   └── index.js              # Backend server
├── src/
│   ├── App.jsx               # Main app component
│   ├── MembershipForm.jsx    # Registration form
│   ├── AdminPanel.jsx        # Admin dashboard
│   └── ...other components
├── package.json              # Dependencies and scripts
├── render.yaml              # Render deployment config
└── README.md                # This file
```

## API Endpoints

- `POST /api/members` - Submit membership application
- `GET /api/members?password=<password>` - Get all members (admin)
- `DELETE /api/members/:id?password=<password>` - Delete member (admin)
- `GET /api/health` - Health check

## Support

For technical support or customization requests, contact:

- **Developer**: Rishad Nur
- **Facebook**: [Rishad Nur](https://www.facebook.com/rishad.nur)

## License

© 2024 BRUDF. All rights reserved.
