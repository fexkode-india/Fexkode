# Google Analytics Integration Guide

Google Analytics has been integrated into your Fexkode website. Follow these steps to activate tracking:

## Setup Steps

### 1. Get Your Measurement ID

1. Go to [Google Analytics 4](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **Admin** (bottom left)
4. Under **Property**, click **Data Streams**
5. Click on your web data stream
6. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Add Your Measurement ID

Replace `G-XXXXXXXXXX` in two locations:

**Location 1: `index.html`** (line ~9)
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID_HERE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_ID_HERE', {
    'anonymize_ip': true,
    'allow_google_signals': false,
    'allow_ad_personalization_signals': false
  });
</script>
```

**Location 2: `src/utils/analytics.js`** (line ~7)
```javascript
export const MEASUREMENT_ID = 'G-YOUR_ID_HERE';
```

**Location 3: `src/App.jsx`** (line ~11)
```javascript
window.gtag('config', 'G-YOUR_ID_HERE', {
  page_path: location.pathname,
  page_title: document.title,
});
```

### 3. Verify Installation

After updating your Measurement ID:

1. Run `npm run dev` to start the development server
2. Open your website in browser
3. Open DevTools (F12) → Console
4. You should see: "Google Analytics initialized with ID: G-YOUR_ID_HERE"
5. Go to your Google Analytics dashboard → Real Time → Overview
6. You should see your session appear within 1-2 seconds

## Features Included

### 📊 Automatic Tracking
- **Page Views**: Every page navigation is automatically tracked
- **Session Data**: User session duration and engagement

### 📱 Manual Tracking Functions

The following functions are available in `src/utils/analytics.js`:

#### Track Custom Events
```javascript
import { trackEvent } from './utils/analytics';

trackEvent('event_name', {
  param1: 'value1',
  param2: 'value2'
});
```

#### Track Form Submissions
```javascript
import { trackFormSubmission } from './utils/analytics';

const handleSubmit = (e) => {
  e.preventDefault();
  trackFormSubmission('contact_form');
  // ... form submission logic
};
```

#### Track Button Clicks
```javascript
import { trackButtonClick } from './utils/analytics';

const handleClick = () => {
  trackButtonClick('CTA Button', 'homepage_hero');
  // ... button click logic
};
```

#### Track External Link Clicks
```javascript
import { trackExternalLink } from './utils/analytics';

const handleExternalLink = (url, text) => {
  trackExternalLink(url, text);
  window.open(url);
};
```

#### Track Article Views
```javascript
import { trackContentView } from './utils/analytics';

// In BlogPost.jsx
useEffect(() => {
  if (post) {
    trackContentView(post._id, post.title, 'blog_post');
  }
}, [post]);
```

## Current Implementation

### ✅ Implemented
- Page view tracking on all route changes
- Privacy-compliant settings (anonymize_ip enabled)
- Measurement ID configuration system

### 🔄 Available for Implementation

These functions are available but not yet integrated into components:

1. **Contact Form Tracking** — Add to `src/pages/Contact.jsx`
2. **Blog Post Views** — Add to `src/pages/BlogPost.jsx`
3. **Button Click Tracking** — Add to CTA buttons
4. **External Link Tracking** — Add to external links

## Data Collection Privacy

The current configuration includes privacy-friendly defaults:
- `anonymize_ip: true` — IP addresses are anonymized
- `allow_google_signals: false` — Demographic data collection disabled
- `allow_ad_personalization_signals: false` — Ad personalization disabled

## Troubleshooting

### Analytics not showing data?

1. **Check Measurement ID** — Verify you're using the correct `G-XXXXXXX` ID
2. **Check Browser Console** — Look for errors in DevTools → Console
3. **Wait for Real-Time** — GA Real-Time data appears within 1-2 seconds
4. **Check GA Settings** — Ensure your property is not filtered
5. **Verify gtag Script** — Open DevTools → Network tab and confirm gtag.js loaded

### 404 errors in Network tab?

This is normal if you haven't set up Google Analytics yet. The script will work once you add your Measurement ID.

## Environment Variables (Optional)

For a more secure setup, you can use environment variables:

1. Create `.env.local` in your project root:
```
VITE_GA_MEASUREMENT_ID=G-YOUR_ID_HERE
```

2. Update `src/App.jsx`:
```javascript
const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
window.gtag('config', gaId, {
  page_path: location.pathname,
  page_title: document.title,
});
```

## Support

- [Google Analytics Documentation](https://support.google.com/analytics)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
- [GA4 Events Guide](https://support.google.com/analytics/answer/9267744)
