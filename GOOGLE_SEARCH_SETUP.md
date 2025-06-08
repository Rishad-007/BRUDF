# Google Search Console Setup Guide

## Prerequisites

- Your website must be deployed and publicly accessible
- You need a Google account

## Step 1: Deploy Your Website

Make sure your website is live on Render.com or your hosting platform.

## Step 2: Submit to Google Search Console

### A. Go to Google Search Console

1. Visit: https://search.google.com/search-console/
2. Sign in with your Google account

### B. Add Your Property

1. Click "Add Property"
2. Choose "URL prefix" option
3. Enter your website URL: `https://your-domain.com`
4. Click "Continue"

### C. Verify Ownership

Choose one of these methods:

**Method 1: HTML Tag (Recommended)**

1. Google will provide an HTML meta tag
2. Add it to the <head> section of your index.html:

```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

**Method 2: HTML File Upload**

1. Download the verification file from Google
2. Upload it to your website's root directory

**Method 3: DNS Verification**

1. Add a TXT record to your domain's DNS settings
2. Use the value provided by Google

## Step 3: Submit Your Sitemap

1. After verification, go to "Sitemaps" in the left menu
2. Enter: `sitemap.xml`
3. Click "Submit"

## Step 4: Request Indexing

1. Go to "URL Inspection" tool
2. Enter your homepage URL
3. Click "Request Indexing"

## Step 5: Monitor Performance

- Check "Coverage" for indexing issues
- Monitor "Performance" for search traffic
- Review "Enhancements" for technical issues

## Additional Tips for Bangladesh-based websites:

### Submit to Local Search Engines:

1. **Bing Webmaster Tools**: https://www.bing.com/webmasters/
2. **Yandex Webmaster**: https://webmaster.yandex.com/

### Optimize for Local Search:

- Add location-specific keywords
- Create content in Bengali (বাংলা)
- Join local directories and forums
- Get backlinks from Bangladeshi websites

### Social Media Promotion:

- Share on Facebook (very popular in Bangladesh)
- Create WhatsApp groups for members
- Use Instagram for visual content
- LinkedIn for professional networking

## Expected Timeline:

- **Initial indexing**: 1-7 days
- **Full site crawl**: 2-4 weeks
- **Search ranking**: 1-3 months

## Monitoring Tools:

1. Google Search Console
2. Google Analytics
3. Google PageSpeed Insights
4. Mobile-Friendly Test
