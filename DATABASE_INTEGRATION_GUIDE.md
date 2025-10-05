# External Database Integration Guide for BRUDF Website

## 🎯 Overview

This guide shows you how to integrate external databases with your BRUDF website to ensure data security and persistence across deployments. Your form data will be safe even if the site is redeployed or restarted.

## 🗄️ Supported Database Options

### 1. **Supabase (Recommended) 🏆**

- **Free Tier:** 500MB database + 2GB bandwidth
- **Features:** Built-in auth, real-time subscriptions, automatic backups
- **Perfect for:** Production deployments, scaling, security

### 2. **PostgreSQL**

- **Free Options:** Railway, Render PostgreSQL, AWS RDS Free Tier
- **Features:** Robust, ACID compliant, excellent performance
- **Perfect for:** Production deployments requiring full control

### 3. **MongoDB Atlas**

- **Free Tier:** 512MB database
- **Features:** Flexible schema, easy scaling, cloud-managed
- **Perfect for:** Rapid development, flexible data structures

### 4. **SQLite (Current)**

- **Good for:** Local development, testing
- **Limitations:** Data lost on redeploys, single-user access

## 🚀 Quick Start with Supabase (Recommended)

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project
4. Note down your project URL and keys

### Step 2: Configure Environment Variables

1. Copy environment template:

   ```bash
   npm run env:copy
   ```

2. Edit `.env` file:
   ```env
   DB_PROVIDER=supabase
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_KEY=your_service_key_here
   SUPABASE_HOST=db.your-project.supabase.co
   SUPABASE_PASSWORD=your_database_password
   ```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Setup Database

```bash
npm run db:setup
```

### Step 5: Test Connection

```bash
npm run db:test
```

### Step 6: Migrate Existing Data (if any)

```bash
npm run db:migrate migrate supabase
```

## 🔧 Installation & Setup Commands

```bash
# Copy environment template
npm run env:copy

# Install all dependencies (including database drivers)
npm install

# Setup database tables and structure
npm run db:setup

# Test database connection
npm run db:test

# Test connection with write operations
npm run db:test -- --test-write

# Test all configured providers
npm run db:test -- --all

# Migrate from SQLite to external database
npm run db:migrate migrate [postgresql|supabase|mongodb]

# Create database backup
npm run data:backup
```

## 🔄 Migration Process

### Migrating from SQLite to External Database

1. **Backup Current Data:**

   ```bash
   npm run data:backup
   ```

2. **Configure External Database:**
   Edit `.env` file with your database credentials

3. **Test Connection:**

   ```bash
   npm run db:test
   ```

4. **Run Migration:**

   ```bash
   # For Supabase
   npm run db:migrate migrate supabase

   # For PostgreSQL
   npm run db:migrate migrate postgresql

   # For MongoDB
   npm run db:migrate migrate mongodb
   ```

5. **Verify Migration:**
   The migration script will automatically verify data integrity

### Rollback Migration (if needed)

```bash
npm run db:migrate rollback /path/to/backup/file.json
```

## 🔐 Security Features

### Automatic Data Protection

- **Encryption:** Production data encrypted at rest
- **Rate Limiting:** Prevents spam and abuse
- **Validation:** Input sanitization and validation
- **Backup:** Automatic incremental backups

### Environment-Based Security

```env
# Security keys (auto-generated in production)
DB_ENCRYPTION_KEY=your_32_character_encryption_key
JWT_SECRET=your_jwt_secret_for_auth

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=50   # Max requests per window
```

## 📊 Database Configuration Examples

### Supabase Configuration

```env
DB_PROVIDER=supabase
SUPABASE_URL=https://abcdefgh.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_HOST=db.abcdefgh.supabase.co
SUPABASE_PASSWORD=your_secure_password
```

### PostgreSQL Configuration

```env
DB_PROVIDER=postgresql
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=brudf_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
```

### MongoDB Configuration

```env
DB_PROVIDER=mongodb
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/brudf_db
```

## 🌐 Deployment Configuration

### Render.com Deployment

1. **Update render.yaml:**
   The file is already configured for external databases

2. **Set Environment Variables in Render Dashboard:**

   - Go to your service in Render
   - Navigate to Environment tab
   - Add your database credentials

3. **Deploy:**
   ```bash
   git add .
   git commit -m "Add external database support"
   git push origin main
   ```

### Railway Deployment

```yaml
# railway.yml
build:
  buildCommand: npm install && npm run build
  startCommand: npm start

environments:
  production:
    DB_PROVIDER: postgresql
    POSTGRES_HOST: ${{POSTGRES.HOST}}
    POSTGRES_PORT: ${{POSTGRES.PORT}}
    POSTGRES_DB: ${{POSTGRES.DATABASE}}
    POSTGRES_USER: ${{POSTGRES.USER}}
    POSTGRES_PASSWORD: ${{POSTGRES.PASSWORD}}
```

### Vercel Deployment

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Setup Environment Variables:**

   ```bash
   # Copy Vercel environment template
   npm run vercel:env

   # Or manually set in Vercel dashboard:
   # - Go to your project in Vercel
   # - Navigate to Settings > Environment Variables
   # - Add your database credentials
   ```

3. **Deploy:**

   ```bash
   # Login to Vercel
   vercel login

   # Deploy
   vercel --prod

   # Or push to main branch (auto-deploy)
   git add .
   git commit -m "Add Vercel deployment support"
   git push origin main
   ```

4. **Configure Database:**

   ```bash
   # After deployment, setup database
   npm run vercel:setup

   # Test the connection
   npm run vercel:test
   ```

**Vercel Environment Variables:**

```env
DB_PROVIDER=supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
SUPABASE_PASSWORD=your_password
```

## 💾 Backup & Recovery

### Automatic Backups

- **Frequency:** Every 6 hours in production
- **Retention:** 30 days
- **Types:** Database snapshots + JSON exports

### Manual Backup

```bash
# Create immediate backup
npm run data:backup

# Export to CSV
npm run backup:csv
```

### Recovery

```bash
# Check available backups
npm run data:check

# Restore from backup (if needed)
npm run data:recover
```

## 🔍 Troubleshooting

### Common Issues

1. **Connection Refused**

   ```bash
   # Test connectivity
   npm run db:test
   # Check firewall and network settings
   ```

2. **Authentication Failed**

   ```bash
   # Verify credentials in .env file
   # Check database user permissions
   ```

3. **Database Not Found**

   ```bash
   # Create database first
   npm run db:setup
   ```

4. **Migration Fails**
   ```bash
   # Check source data first
   npm run data:check
   # Verify target database connection
   npm run db:test
   ```

### Debugging Commands

```bash
# Verbose connection test
DB_PROVIDER=supabase npm run db:test -- --test-write

# Check all providers
npm run db:test -- --all

# View current configuration
node -e "import('./server/databaseConfig.js').then(c => console.log(JSON.stringify(c.getDatabaseConfig(), null, 2)))"
```

## 📈 Performance Optimization

### Connection Pooling

- **SQLite:** Single connection (file-based)
- **PostgreSQL:** 2-10 connections in pool
- **MongoDB:** 2-10 connections in pool

### Indexing

Automatic indexes created on:

- `email` (unique)
- `department`
- `created_at`

### Caching

- **Member data:** 5-minute cache
- **Connection pooling:** Automatic
- **Query optimization:** Built-in

## 🎯 Next Steps

1. **Choose Your Database:**

   - Development: SQLite (current)
   - Production: Supabase (recommended)

2. **Setup Process:**

   - Create database account
   - Configure environment variables
   - Run setup and migration
   - Test thoroughly

3. **Deploy:**
   - Update deployment configuration
   - Set production environment variables
   - Deploy with confidence

## 💡 Pro Tips

1. **Development Workflow:**

   ```bash
   # Use SQLite for development
   DB_PROVIDER=sqlite npm run dev

   # Test with production database
   DB_PROVIDER=supabase npm run dev
   ```

2. **Data Safety:**

   ```bash
   # Always backup before migration
   npm run data:backup

   # Test migration with small dataset first
   ```

3. **Monitoring:**

   ```bash
   # Check database health
   npm run db:test

   # Monitor performance
   npm run db:test -- --test-write
   ```

## 🆘 Support

If you encounter issues:

1. **Check Environment Variables:** Ensure all required variables are set
2. **Test Connection:** Use `npm run db:test` to diagnose issues
3. **Check Logs:** Look for specific error messages
4. **Verify Credentials:** Double-check database credentials
5. **Network Issues:** Ensure database server is accessible

Your BRUDF website is now ready for secure, persistent data storage! 🎉
