import { api } from '@/lib/api';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviewCount: number;
    sales: number;
    stock: number;
    images: string[];
    category: {
        id: number;
        name: string;
        slug: string;
    };
    creator: {
        id: number;
        name: string;
        avatar?: string;
    };
    tags: string[];
    isNew?: boolean;
    isBestSeller?: boolean;
    active: boolean; // Added active field
    status?: string; // Added status field for UI compatibility if needed
}

export interface ProductSearchParams {
    q?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
    page?: number;
    size?: number;
}

export const ProductService = {
    getAll: async () => {
        const response = await api.get<Product[]>('/products');
        return response.data;
    },

    getActive: async () => {
        const response = await api.get<Product[]>('/products/active');
        return response.data;
    },

    getById: async (id: number | string) => {
        const response = await api.get<Product>(`/products/${id}`);
        return response.data;
    },

    getByCreatorId: async (creatorId: number | string) => {
        const response = await api.get<Product[]>(`/products/creator/${creatorId}`);
        return response.data;
    },

    // Note: Backend endpoint /products/search needs to be restored if missing
    search: async (params: ProductSearchParams) => {
        const response = await api.get<Product[]>('/products/search', { params });
        return response.data;
    },

    // Add missing methods referenced in Implementation Plan if any?
    // Plan mentioned getWishlist etc, but we moved them to WishlistService.
};
