import { api } from '@/lib/api';

export interface WishlistItem {
    id: number;
    userId: number;
    productId: number;
    productName: string; // Helper for display
    productPrice: number; // Helper for display
    productImage?: string; // Helper for display
    addedAt: string;
}

export const WishlistService = {
    addToWishlist: async (userId: number, productId: number) => {
        const response = await api.post('/wishlists', { userId, productId });
        return response.data;
    },

    removeFromWishlist: async (userId: number, productId: number) => {
        await api.delete(`/wishlists/user/${userId}/product/${productId}`);
    },

    getUserWishlist: async (userId: number | string) => {
        const response = await api.get<WishlistItem[]>(`/wishlists/user/${userId}`);
        return response.data;
    },

    isInWishlist: async (userId: number, productId: number) => {
        const response = await api.get<boolean>(`/wishlists/user/${userId}/product/${productId}/exists`);
        return response.data;
    }
};
