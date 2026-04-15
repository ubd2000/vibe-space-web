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
        // const response = await api.get<PortfolioItem[]>(`/portfolio/creator/${creatorId}`);
        // return response.data;

        await new Promise(resolve => setTimeout(resolve, 500));

        return [
            {
                id: 1,
                creatorId: Number(creatorId),
                title: "Cyberpunk City Concept",
                type: "Concept Art",
                imageUrl: "https://images.unsplash.com/photo-1615840287214-7ff58ee04896?auto=format&fit=crop&q=80&w=800",
                description: "Concept art for a future project.",
                createdAt: "2024-01-15"
            },
            {
                id: 2,
                creatorId: Number(creatorId),
                title: "Character Sketch - Luna",
                type: "Sketch",
                imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop",
                description: "Initial sketch for Luna Elf.",
                createdAt: "2024-02-01"
            }
        ];
    },

    create: async (data: CreatePortfolioItemRequest) => {
        const response = await api.post<PortfolioItem>('/portfolio', data);
        return response.data;
    },

    delete: async (id: number | string) => {
        await api.delete(`/portfolio/${id}`);
    }
};
