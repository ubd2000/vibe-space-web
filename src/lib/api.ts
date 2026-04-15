import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 에러 핸들링을 위한 응답 인터셉터 추가
// JWT 토큰 주입을 위한 요청 인터셉터 추가
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

// 공개 엔드포인트 패턴 정의 (권한 없이 접근 가능)
const publicEndpoints = [
    { path: '/api/auth', method: 'ALL' },
    { path: '/api/categories', method: 'GET' },
    { path: '/api/products', method: 'GET' },
    { path: '/api/creators', method: 'GET' },
    { path: '/api/reviews', method: 'GET' },
    { path: '/api/posts', method: 'GET' },
    { path: '/api/portfolio', method: 'GET' },
    { path: '/api/coupons', method: 'GET' },
];

// URL이 공개 엔드포인트인지 확인
const isPublicEndpoint = (url: string, method: string): boolean => {
    const urlWithoutQuery = url.split('?')[0];
    return publicEndpoints.some(endpoint => {
        const matchesPath = urlWithoutQuery.startsWith(endpoint.path);
        const matchesMethod = endpoint.method === 'ALL' || endpoint.method === method.toUpperCase();
        return matchesPath && matchesMethod;
    });
};

// 에러 핸들링을 위한 응답 인터셉터 추가
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // 글로벌 에러 처리 (예: 401/403 시 리다이렉트)
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // 공개 엔드포인트는 401/403이어도 리다이렉트하지 않음
            const requestUrl = error.config?.url || '';
            const requestMethod = error.config?.method || '';

            if (!isPublicEndpoint(requestUrl, requestMethod)) {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);
