import { api } from '@/lib/api';

export interface OrderItem {
    productId: number;
    productName: string;
    unitPrice: number;
    quantity: number;
    creatorId: number;
}

export interface Order {
    id: number;
    orderNumber?: string;
    userId: number;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    totalAmount: number;
    status: 'PENDING' | 'PAYMENT_PROCESSING' | 'PAID' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';
    createdAt: string;
}

export interface CreateOrderRequest {
    userId: number;
    items: {
        productId: number;
        productName: string;
        unitPrice: number;
        quantity: number;
        creatorId: number;
    }[];
    subtotal: number;
    tax: number;
}

export const OrderService = {
    // Create a new order
    create: async (data: CreateOrderRequest) => {
        const response = await api.post<Order>('/orders', data);
        return response.data;
    },

    // Get order by ID
    getById: async (id: number | string) => {
        const response = await api.get<Order>(`/orders/${id}`);
        return response.data;
    },

    // Get orders by user ID
    getByUserId: async (userId: number | string) => {
        const response = await api.get<Order[]>(`/orders/user/${userId}`);
        return response.data;
    },

    // Get orders by status
    getByStatus: async (status: string) => {
        const response = await api.get<Order[]>(`/orders/status/${status}`);
        return response.data;
    }
};
