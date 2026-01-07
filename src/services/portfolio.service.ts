import { api } from '@/lib/api';

export interface PortfolioItem {
    id: number;
    creatorId: number;
    title: string;
    type: string;
    imageUrl?: string;
    description?: string;
    createdAt: string;
}

export interface CreatePortfolioItemRequest {
    creatorId: number;
    title: string;
    type: string;
    imageUrl?: string;
    description?: string;
}

export const PortfolioService = {
    getByCreatorId: async (creatorId: number | string) => {
        // Backend: GET /api/portfolio/creator/{creatorId}
        const response = await api.get<PortfolioItem[]>(`/portfolio/creator/${creatorId}`);
        return response.data;
    },

    create: async (data: CreatePortfolioItemRequest) => {
        const response = await api.post<PortfolioItem>('/portfolio', data);
        return response.data;
    },

    delete: async (id: number | string) => {
        await api.delete(`/portfolio/${id}`);
    }
};
