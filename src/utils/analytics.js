/**
 * Event helpers for the Google Tag Manager data layer.
 *
 * GA4 is intentionally configured in GTM (GTM-NJPLTMH6), not in this app.
 */

/**
 * Track a custom event
 * @param {string} eventName - Name of the event
 * @param {Object} eventParams - Event parameters
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
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
