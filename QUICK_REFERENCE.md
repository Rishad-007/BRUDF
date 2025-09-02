# 🚀 BRUDF Website - Quick Reference

## 📁 **Project Structure Overview**
```
clubsitev2/
├── src/                    # React frontend components
├── server/                 # Node.js backend + API
│   ├── data/              # Multi-layer data storage
│   ├── index.js           # Main server
│   ├── database.js        # Database + backup system
│   ├── csvReader.js       # CSV processing + persistence
│   ├── config.js          # Configuration management
│   └── dataRecovery.js    # Emergency recovery tools
├── public/                # Static assets (images, etc.)
├── dist/                  # Production build
└── *.config.js           # Build configurations
```

## 🛠️ **Development Commands**
```bash
npm run dev                # Start development server
npm run build              # Build for production  
npm start                  # Start production server
npm run dev:server         # Start backend only
```

## 💾 **Data Management Commands**
```bash
npm run data:backup        # Create manual backup
npm run data:recover       # Emergency data recovery
npm run data:check         # Check data sources
npm run data:export        # Export data to CSV
```

## 🌐 **Access URLs**
- **Frontend**: http://localhost:3001
- **Admin Panel**: http://localhost:3001 + Ctrl+Shift+A
- **Admin Password**: `brudf2024admin`

## 🛡️ **Data Protection (8 Layers)**
1. **Primary Database**: `data/members.db` (persistent SQLite)
2. **Emergency Backup**: `data/emergencyBackup/` (real-time)
3. **Scheduled Backups**: `data/backup/` (hourly)
4. **JSON Multi-storage**: 3 locations (30-min intervals)
5. **CSV Exports**: `data/csvBackups/` (hourly)
6. **Original CSV**: `data/previousData/memberdata.csv` (153 records)
7. **Shutdown Backups**: All locations (on restart)
8. **Render Persistent Disk**: 2GB permanent storage

## 🚨 **Emergency Recovery**
If data is lost:
1. `npm run data:check` - Verify available sources
2. `npm run data:recover` - Automatic recovery attempt
3. Check `server/data/` folders manually
4. Restore from `memberdata.csv` if needed

## 📊 **Current Status**
- ✅ **CSV Import**: Fixed (153 member records loaded)
- ✅ **Persistent Storage**: Database survives restarts
- ✅ **Auto Backups**: Every 30 minutes + hourly
- ✅ **Deployment Safe**: Data preserved on rebuilds
- ✅ **Multi-layer Protection**: 8 redundant systems

## 🔧 **Key Files to Know**
- `server/index.js` - Main server with API routes
- `server/database.js` - Database operations + backups  
- `server/csvReader.js` - Data persistence manager
- `src/AdminPanel.jsx` - Admin dashboard component
- `src/MembershipForm.jsx` - Registration form
- `render.yaml` - Deployment configuration

## 📝 **Before Every Commit**
1. Update `PROJECT_LOG.md` with changes made
2. Test data persistence: `npm run data:check`
3. Verify server starts: `npm start`
4. Check admin panel functionality
5. Document any new features or fixes

## 🆘 **Common Issues & Solutions**

| Issue | Solution |
|-------|----------|
| Data lost on deployment | Check Render persistent disk is mounted |
| CSV not importing | Verify `memberdata.csv` exists in `data/previousData/` |
| Server won't start | Check database permissions and backup folders |
| Admin panel not loading | Verify admin password and API endpoints |
| Backup system failing | Check disk space and folder permissions |

## 📞 **Project Info**
- **Repository**: BRUDF_Site_2 (Rishad-007)
- **Tech Stack**: React + Vite, Node.js + Express, SQLite
- **Deployment**: Render.com with persistent storage
- **Last Major Update**: 2025-09-03 (Multi-layer data persistence)

---
**💡 Tip**: Always check `PROJECT_LOG.md` for detailed change history and implementation details!
