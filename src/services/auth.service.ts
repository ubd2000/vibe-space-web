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
    profileImageUrl?: string; // avatarUrl에서 변경됨
    nickname?: string;        // fullName에서 변경됨
    introduction?: string;    // bio에서 변경됨
}

export const authService = {
    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    // 향후: login, me 등 추가 예정
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', data);
        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);

            // 닉네임, 소개, 프로필 이미지 URL 등 상세 프로필 정보를 가져옵니다.
            // 백엔드의 AuthResponse에 해당 정보가 없거나, 최신 상태를 보장하기 위함입니다.
            try {
                // 응답에서 userId를 확인합니다. response.data.id가 존재한다고 가정합니다.
                if (response.data.id) {
                    const userDetailResponse = await api.get<AuthResponse>(`/users/${response.data.id}`);
                    const userDetail = userDetailResponse.data;

                    // 인증 응답과 상세 프로필 정보를 병합합니다.
                    const fullUserData = {
                        ...response.data,
                        ...userDetail
                    };
                    localStorage.setItem('user', JSON.stringify(fullUserData));
                    return fullUserData;
                }
            } catch (error) {
                console.error("로그인 시 사용자 상세 정보를 가져오는데 실패했습니다.", error);
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
