// API Configuration
export const API_CONFIG = {
    // Using Vite proxy in dev, direct URL in prod
    BASE_URL: import.meta.env.VITE_API_BASE_URL,
    ENDPOINTS: {
        LOGIN: '/user/login',
        SIGNUP: '/user/signup',
        PROFILE: '/user/profile/',
        UPDATE_PASSWORD: '/user/update-password',
    },
    TIMEOUT: 10000,
};

// Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'dropp_auth_token',
    USER_DATA: 'dropp_user_data',
};
