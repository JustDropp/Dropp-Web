// API Configuration
export const API_CONFIG = {
    // Using Vite proxy to avoid CORS issues in development
    // Proxy configured in vite.config.js
    BASE_URL: 'https://63ztvgg2-8000.inc1.devtunnels.ms',
    ENDPOINTS: {
        LOGIN: '/user/login',
        SIGNUP: '/user/signup',
    },
    TIMEOUT: 10000,
};

// Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'dropp_auth_token',
    USER_DATA: 'dropp_user_data',
};
