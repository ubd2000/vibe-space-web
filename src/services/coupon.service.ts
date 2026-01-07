import { api } from '@/lib/api';

export interface CouponValidationResponse {
    code: string;
    discountPercent: number;
    valid: boolean;
    message?: string;
}

export const CouponService = {
    validate: async (code: string, purchaseAmount: number) => {
        // Backend: GET /api/coupons/{code}?purchaseAmount=...
        const response = await api.get<CouponValidationResponse>(`/coupons/${code}`, {
            params: { purchaseAmount }
        });
        return response.data;
    },

    apply: async (userId: number, couponCode: string, purchaseAmount: number) => {
        const response = await api.post<{ discountAmount: number }>('/coupons/apply', {
            userId,
            couponCode,
            purchaseAmount
        });
        return response.data;
    },

    getUserCoupons: async (userId: number) => {
        const response = await api.get<any[]>(`/coupons/user/${userId}`);
        return response.data;
    }
};
