import { api } from '@/lib/api';

export interface Creator {
    id: number;
    userId: number;
    displayName: string;
    avatarUrl?: string;
    description?: string;
    verified: boolean;
    stats: {
        followers: number;
        totalSales: number;
        rating: number;
        totalReviews: number;
    };
}

export const CreatorService = {
    create: async (data: { userId: number; displayName: string; description?: string; avatarUrl?: string }) => {
        const response = await api.post<Creator>('/creators', data);
        return response.data;
    },

    getAll: async () => {
        const response = await api.get<Creator[]>('/creators');
        return response.data;
    },

    getById: async (id: number | string) => {
        // 실제 백엔드 API 호출 (권한 없이 접근 가능한 공개 엔드포인트)
        const response = await api.get<Creator>(`/creators/${id}`);
        return response.data;
    },

    getByUserId: async (userId: number | string) => {
        const response = await api.get<Creator>(`/creators/user/${userId}`);
        return response.data;
    },

    getTopFollowers: async () => {
        const response = await api.get<Creator[]>('/creators/top-followers');
        return response.data;
    },

    getTopRated: async () => {
        const response = await api.get<Creator[]>('/creators/top-rated');
        return response.data;
    },

    getDashboardStats: async (creatorId: number | string) => {
        // Since there is no dedicated dashboard stats endpoint, we can fetch the creator details
        // which includes stats like followers, totalSales, etc.
        // In a real app, there might be a dedicated /creators/{id}/dashboard endpoint.
        const response = await api.get<Creator>(`/creators/${creatorId}`);
        return response.data.stats;
    },

    update: async (creatorId: number | string, data: Partial<Creator>) => {
        const response = await api.patch<Creator>(`/creators/${creatorId}`, data);
        return response.data;
    }
};
