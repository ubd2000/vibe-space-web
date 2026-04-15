import { api } from '@/lib/api';

/**
 * Category interfaces matching backend DTOs
 */
export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    iconUrl?: string;
    parentId?: number;
    level: number;
    displayOrder: number;
    active: boolean;
}

export interface CategoryTree {
    id: number;
    name: string;
    slug: string;
    description?: string;
    iconUrl?: string;
    level: number;
    displayOrder: number;
    subcategories: CategoryTree[];
}

/**
 * Category Service
 * Provides methods to interact with category endpoints
 */
export const CategoryService = {
    /**
     * Get full category tree (all levels with hierarchy)
     * Used for LNB (Left Navigation Bar) rendering
     */
    getCategoryTree: async (): Promise<CategoryTree[]> => {
        const response = await api.get<CategoryTree[]>('/categories/tree');
        return response.data;
    },

    /**
     * Get top-level categories only (Level 1)
     */
    getTopLevelCategories: async (): Promise<Category[]> => {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    },

    /**
     * Get category by ID
     */
    getById: async (id: number): Promise<Category> => {
        const response = await api.get<Category>(`/categories/${id}`);
        return response.data;
    },

    /**
     * Get category by slug
     * Used for filtering products by category
     */
    getBySlug: async (slug: string): Promise<Category> => {
        const response = await api.get<Category>(`/categories/by-slug/${slug}`);
        return response.data;
    },

    /**
     * Get subcategories of a specific category
     */
    getSubcategories: async (parentId: number): Promise<Category[]> => {
        const response = await api.get<Category[]>(`/categories/${parentId}/subcategories`);
        return response.data;
    },

    /**
     * Get categories by level (1, 2, or 3)
     */
    getByLevel: async (level: number): Promise<Category[]> => {
        const response = await api.get<Category[]>(`/categories/by-level/${level}`);
        return response.data;
    },
};
