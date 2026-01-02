// Environment Variables Helper
// Centralized access to all environment variables with type safety

interface EnvConfig {
  // Google Analytics
  ga4MeasurementId: string;
  enableGA4: boolean;
  
  // Google Search Console
  gscVerificationCode: string;
  enableGSC: boolean;
  
  // Contact Info
  contactEmail: string;
  businessName: string;
  businessPhone: string;
  
  // URLs
  siteUrl: string;
  ogImageUrl: string;
  apiBaseUrl: string;
  apiSendEmailEndpoint: string;
  
  // Social Media
  facebookUrl: string;
  instagramUrl: string;
  
  // Business Location
  businessCountry: string;
  businessCity: string;
  businessLatitude: string;
  businessLongitude: string;
  
  // SEO
  siteDescription: string;
  siteKeywords: string;
  
  // Features
  enableEmail: boolean;
}

const getEnvVar = (key: string, defaultValue: string = ''): string => {
  const value = import.meta.env[key];
  if (value === undefined || value === '') {
    console.warn(`Environment variable ${key} is not set, using default: ${defaultValue}`);
    return defaultValue;
  }
  return value;
};

const getBooleanEnvVar = (key: string, defaultValue: boolean = false): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === true;
};

export const env: EnvConfig = {
  // Google Analytics
  ga4MeasurementId: getEnvVar('VITE_GA4_MEASUREMENT_ID', 'G-XXXXXXXXXX'),
  enableGA4: getBooleanEnvVar('VITE_ENABLE_GA4', true),
  
  // Google Search Console
  gscVerificationCode: getEnvVar('VITE_GSC_VERIFICATION_CODE', 'your_gsc_verification_code_here'),
  enableGSC: getBooleanEnvVar('VITE_ENABLE_GSC', true),
  
  // Contact Info
  contactEmail: getEnvVar('VITE_CONTACT_EMAIL', 'twojawrozkasamira@gmail.com'),
  businessName: getEnvVar('VITE_BUSINESS_NAME', 'Wróżka Samira'),
  businessPhone: getEnvVar('VITE_BUSINESS_PHONE', '+48-724-320-995'),
  
  // URLs
  siteUrl: getEnvVar('VITE_SITE_URL', 'https://www.wiedzmasamira.pl'),
  ogImageUrl: getEnvVar('VITE_OG_IMAGE_URL', 'https://www.wiedzmasamira.pl/og-image.jpg'),
  apiBaseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3001'),
  apiSendEmailEndpoint: getEnvVar('VITE_API_SEND_EMAIL_ENDPOINT', '/api/send-email'),
  
  // Social Media
  facebookUrl: getEnvVar('VITE_FACEBOOK_URL', 'https://www.facebook.com/profile.php?id=61571159270154'),
  instagramUrl: getEnvVar('VITE_INSTAGRAM_URL', 'https://www.instagram.com/tarotsamira?igsh=dWttdXZqZmhlbG05'),
  
  // Business Location
  businessCountry: getEnvVar('VITE_BUSINESS_COUNTRY', 'PL'),
  businessCity: getEnvVar('VITE_BUSINESS_CITY', 'Polska'),
  businessLatitude: getEnvVar('VITE_BUSINESS_LATITUDE', '52.2297'),
  businessLongitude: getEnvVar('VITE_BUSINESS_LONGITUDE', '21.0122'),
  
  // SEO
  siteDescription: getEnvVar('VITE_SITE_DESCRIPTION', 'Certyfikowany tarocista z 15+ latami doświadczenia.'),
  siteKeywords: getEnvVar('VITE_SITE_KEYWORDS', 'czytanie tarota, tarot online, wróżba z kart'),
  
  // Features
  enableEmail: getBooleanEnvVar('VITE_ENABLE_EMAIL', true),
};

// Helper function to get full API URL
export const getApiUrl = (endpoint: string = ''): string => {
  return `${env.apiBaseUrl}${endpoint}`;
};

// Helper to check if we're in production
export const isProduction = (): boolean => {
  return import.meta.env.PROD;
};

// Helper to check if we're in development
export const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};

export default env;