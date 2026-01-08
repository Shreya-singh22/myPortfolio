# Deployment Guide

Your portfolio website is ready to deploy! Here are the easiest ways to get a public link:

## Option 1: Netlify Drop (Easiest - No account needed)

1. Go to https://app.netlify.com/drop
2. Drag and drop your entire "my website" folder onto the page
3. You'll get a public URL instantly (e.g., `https://random-name-123.netlify.app`)
4. You can customize the URL later if you create a free account

## Option 2: Vercel (Recommended)

1. Go to https://vercel.com
2. Sign up/login with GitHub (free)
3. Click "Add New Project"
4. Drag and drop your "my website" folder
5. Click "Deploy"
6. You'll get a URL like `https://your-project.vercel.app`

## Option 3: GitHub Pages (Free)

1. Create a new repository on GitHub
2. Upload all files from "my website" folder
3. Go to Settings > Pages
4. Select main branch and save
5. Your site will be at `https://yourusername.github.io/repository-name`

## Option 4: Surge.sh (Quick CLI)

```bash
npm install -g surge
cd "/Users/shreyachauhan/Desktop/my website"
surge
# Follow the prompts to create account and deploy
```

---

**Recommended: Use Netlify Drop for the fastest deployment!**
