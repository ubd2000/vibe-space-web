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
    active: boolean; // 활성 상태 필드 추가됨
    status?: string; // UI 호환성을 위한 상태 필드 추가됨
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

    getTrending: async () => {
        // 백엔드 API가 준비되지 않았으므로 모의 데이터 사용
        // 실제 API 구현 시 이 부분을 api.get 요청으로 대체해야 함
        await new Promise(resolve => setTimeout(resolve, 500)); // 자연스러운 로딩 지연 시뮬레이션

        const mockProducts: Product[] = [
            {
                id: 1,
                name: "네온 드리머",
                description: "미래지향적 사이버펑크 스타일 아바타",
                price: 25000,
                rating: 4.8,
                reviewCount: 120,
                sales: 234,
                stock: 100,
                images: [], // 컴포넌트에서 fallback 이미지 사용
                category: { id: 1, name: "3D 모델", slug: "3d-model" },
                creator: { id: 1, name: "PixelMaster" },
                tags: ["cyberpunk", "neon"],
                active: true
            },
            {
                id: 2,
                name: "루나 엘프",
                description: "신비로운 달의 요정",
                price: 35000,
                rating: 4.9,
                reviewCount: 200,
                sales: 456,
                stock: 50,
                images: [],
                category: { id: 2, name: "2D 에셋", slug: "2d-asset" },
                creator: { id: 2, name: "MoonArtist" },
                tags: ["fantasy", "elf"],
                active: true
            },
            {
                id: 3,
                name: "사이버 워리어",
                description: "강력한 전투형 안드로이드",
                price: 45000,
                rating: 4.7,
                reviewCount: 150,
                sales: 312,
                stock: 80,
                images: [],
                category: { id: 3, name: "3D 모델", slug: "3d-model" },
                creator: { id: 3, name: "TechCreator" },
                tags: ["warrior", "mech"],
                active: true
            },
            {
                id: 4,
                name: "핑크 캣걸",
                description: "귀여운 고양이 귀 소녀",
                price: 30000,
                rating: 4.9,
                reviewCount: 300,
                sales: 567,
                stock: 120,
                images: [],
                category: { id: 4, name: "2D 에셋", slug: "2d-asset" },
                creator: { id: 4, name: "KawaiiDev" },
                tags: ["cute", "catgirl"],
                active: true
            }
        ];

        return mockProducts;
    },

    // 참고: 백엔드 엔드포인트 /products/search가 없는 경우 복원 필요
    search: async (params: ProductSearchParams) => {
        const response = await api.get<Product[]>('/products/search', { params });
        return response.data;
    },

    // 구현 계획에서 참조된 누락된 메서드 추가 필요 여부 확인
    // 계획에서 getWishlist 등이 언급되었으나 WishlistService로 이동함
};
