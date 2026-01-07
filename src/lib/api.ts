import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add response interceptor for error handling
// Add request interceptor to inject the JWT token
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors if needed (e.g., 401 redirect)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);
