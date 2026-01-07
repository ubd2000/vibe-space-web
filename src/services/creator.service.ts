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
    getAll: async () => {
        const response = await api.get<Creator[]>('/creators');
        return response.data;
    },

    getById: async (id: number | string) => {
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
