# Deployment Guide for ethan-bell.com

## Quick Deployment to Railway

### Step 1: Deploy to Railway

1. **Go to Railway**: Visit [railway.app](https://railway.app) and log in
2. **Create New Project**: Click "New Project"
3. **Deploy from GitHub**: 
   - Select "Deploy from GitHub repo"
   - Choose your repository: `ethan33456/portfolio`
   - Railway will automatically detect this as a Next.js project
4. **Wait for Build**: Railway will automatically:
   - Install dependencies
   - Build your Next.js app
   - Deploy it to a Railway URL (like `yourapp.up.railway.app`)

### Step 2: Configure Environment Variables (if needed)

1. In your Railway project, go to the **Variables** tab
2. Add any environment variables your app needs (currently none are required)

### Step 3: Connect Your Custom Domain (ethan-bell.com)

#### Option A: If using Railway's nameservers (Recommended)

1. In your Railway project, go to **Settings** → **Domains**
2. Click **Add Domain**
3. Enter `ethan-bell.com`
4. Railway will provide you with nameserver records
5. Go to your domain registrar (where you bought ethan-bell.com)
6. Update the nameservers to the ones provided by Railway
7. Wait for DNS propagation (can take up to 48 hours, usually much faster)

#### Option B: If keeping your current nameservers

1. In your Railway project, go to **Settings** → **Domains**
2. Click **Add Domain**
3. Enter `ethan-bell.com`
4. Railway will show you DNS records to add:
   - **A Record**: Point `@` to Railway's IP address
   - **CNAME**: Point `www` to your Railway URL
5. Go to your domain registrar's DNS management
6. Add the records Railway provided
7. Wait for DNS propagation (usually 5-30 minutes)

### Step 4: Add www subdomain (Optional)

1. In Railway Settings → Domains
2. Add `www.ethan-bell.com` as another custom domain
3. Set up a redirect from www to the apex domain (or vice versa)

### Step 5: Verify Deployment

Once DNS propagates, visit:
- https://ethan-bell.com
- Your site should be live! 🎉

## Railway Automatic Deployments

Railway is now connected to your GitHub repository. Every time you push to the `main` branch:
- Railway automatically detects the changes
- Builds your application
- Deploys the new version
- Zero downtime deployment

## Troubleshooting

### Build Fails
- Check the Railway logs in the **Deployments** tab
- Ensure all dependencies are in `package.json`
- The configuration files are already set up correctly

### Domain Not Working
- Wait for DNS propagation (can take up to 48 hours)
- Check DNS settings with: `dig ethan-bell.com`
- Verify SSL certificate is active in Railway (automatic)

### App Crashes
- Check Railway logs in the **Deployments** tab
- Ensure Node.js version compatibility (currently using Node 18)

## Local Development

To run locally:
```bash
cd /home/ethan/projects/portfolio/portfolio
npm install
npm run dev
```

Visit `http://localhost:3000`

## Making Changes

1. Edit files locally
2. Test with `npm run dev`
3. Commit changes: `git add . && git commit -m "Your message"`
4. Push to GitHub: `git push origin main`
5. Railway automatically deploys! ✨

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

---

**Your repository**: https://github.com/ethan33456/portfolio
**Railway Dashboard**: https://railway.app/dashboard

