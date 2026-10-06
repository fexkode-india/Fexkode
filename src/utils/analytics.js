/**
 * Google Analytics Utility Functions
 * Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID
 */

export const MEASUREMENT_ID = 'G-XXXXXXXXXX';

/**
 * Initialize Google Analytics
 * This is called automatically on page load via the gtag script in index.html
 */
export const initializeAnalytics = () => {
  if (window.gtag) {
    console.log('Google Analytics initialized with ID:', MEASUREMENT_ID);
  } else {
    console.warn('Google Analytics gtag not found. Make sure to add your Measurement ID to index.html');
  }
};

/**
 * Track a page view
 * @param {string} pagePath - The page path (e.g., '/blog', '/contact')
 * @param {string} pageTitle - The page title
 */
export const trackPageView = (pagePath, pageTitle) => {
  if (window.gtag) {
    window.gtag('config', MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {Object} eventParams - Event parameters
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track form submissions
 * @param {string} formName - Name of the form (e.g., 'contact_form')
 */
export const trackFormSubmission = (formName) => {
  trackEvent('form_submit', {
    form_name: formName,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track button clicks
 * @param {string} buttonName - Name/label of the button
 * @param {string} location - Location of the button (e.g., 'homepage_hero')
 */
export const trackButtonClick = (buttonName, location = '') => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location,
  });
};

/**
 * Track external link clicks
 * @param {string} linkUrl - URL of the external link
 * @param {string} linkText - Text of the link
 */
export const trackExternalLink = (linkUrl, linkText = '') => {
  trackEvent('external_link_click', {
    link_url: linkUrl,
    link_text: linkText,
  });
};

/**
 * Track search queries
 * @param {string} searchQuery - The search query
 */
export const trackSearch = (searchQuery) => {
  trackEvent('search', {
    search_term: searchQuery,
  });
};

/**
 * Track content views (articles, blog posts, etc.)
 * @param {string} contentId - ID of the content
 * @param {string} contentTitle - Title of the content
 * @param {string} contentType - Type of content (e.g., 'blog_post', 'article')
 */
export const trackContentView = (contentId, contentTitle, contentType = 'article') => {
  trackEvent('view_item', {
    content_id: contentId,
    content_title: contentTitle,
    content_type: contentType,
  });
};
