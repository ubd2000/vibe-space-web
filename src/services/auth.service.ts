import { api } from '@/lib/api';

export interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    nickname: string;
}

export interface LoginRequest {
    usernameOrEmail: string;
    password: string;
}

export interface AuthResponse {
    accessToken: string;
    tokenType: string;
    username: string;
    email: string;
    role: string;
    id: number;
    profileImageUrl?: string; // Renamed from avatarUrl
    nickname?: string;        // Renamed from fullName
    introduction?: string;    // Renamed from bio
}

export const authService = {
    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    // Future: login, me, etc.
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', data);
        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);

            // Fetch detailed user profile to get nickname, introduction, profileImageUrl
            // because AuthResponse from backend might lack them (or to ensure freshness)
            try {
                // Determine userId from response. Assuming response.data.id exists.
                if (response.data.id) {
                    const userDetailResponse = await api.get<AuthResponse>(`/users/${response.data.id}`);
                    const userDetail = userDetailResponse.data;

                    // Merge auth response with detailed profile
                    const fullUserData = {
                        ...response.data,
                        ...userDetail
                    };
                    localStorage.setItem('user', JSON.stringify(fullUserData));
                    return fullUserData;
                }
            } catch (error) {
                console.error("Failed to fetch user details on login", error);
            }

            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem('user');
            if (userStr) return JSON.parse(userStr);
        }
        return null;
    }
};
