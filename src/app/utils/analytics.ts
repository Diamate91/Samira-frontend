// Google Analytics 4 Event Tracking Utilities

/**
 * Track a custom event in Google Analytics 4
 * @param eventName - Name of the event (e.g., 'button_click', 'form_submit')
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location || 'unknown',
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track service card clicks
 */
export const trackServiceClick = (serviceName: string, serviceId: number) => {
  trackEvent('service_card_click', {
    service_name: serviceName,
    service_id: serviceId,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track form submissions
 */
export const trackFormSubmit = (formName: string, formData?: Record<string, any>) => {
  trackEvent('form_submit', {
    form_name: formName,
    ...formData,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track navigation/link clicks
 */
export const trackNavigation = (destination: string, linkText?: string) => {
  trackEvent('navigation_click', {
    destination: destination,
    link_text: linkText || 'unknown',
    timestamp: new Date().toISOString(),
  });
};

/**
 * Alias for trackNavigation - for semantic clarity in navbar
 */
export const trackNavigationClick = (linkText: string) => {
  trackNavigation(linkText, linkText);
};

/**
 * Track scroll depth
 */
export const trackScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track video interactions
 */
export const trackVideoPlay = (videoName: string) => {
  trackEvent('video_play', {
    video_name: videoName,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track modal/dialog opens
 */
export const trackModalOpen = (modalName: string) => {
  trackEvent('modal_open', {
    modal_name: modalName,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track CTA (Call To Action) clicks
 */
export const trackCTAClick = (ctaName: string, ctaLocation: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Track contact form field interactions
 */
export const trackFormFieldInteraction = (fieldName: string, action: 'focus' | 'blur' | 'change') => {
  trackEvent('form_field_interaction', {
    field_name: fieldName,
    action: action,
    timestamp: new Date().toISOString(),
  });
};