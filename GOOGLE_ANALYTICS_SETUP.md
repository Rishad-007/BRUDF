# Google Analytics Setup Instructions

## Step 1: Create Google Analytics Account

1. Go to https://analytics.google.com/
2. Sign in with your Google account
3. Click "Start measuring"
4. Set up a property for your website
5. Get your Measurement ID (starts with G-)

## Step 2: Add the tracking code to your website

Replace 'GA_MEASUREMENT_ID' in the code below with your actual Measurement ID:

```html
<!-- Google tag (gtag.js) -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

Add this code to the <head> section of index.html

## Step 3: Verify installation

- Deploy your website
- Visit your site
- Check Google Analytics dashboard for real-time data
