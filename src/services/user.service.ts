import { api } from '@/lib/api';
import { AuthResponse } from './auth.service';

export interface UpdateUserRequest {
    nickname?: string;
    introduction?: string;
    profileImageUrl?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export const UserService = {
    getById: async (id: number | string) => {
        const response = await api.get<AuthResponse>(`/users/${id}`);
        return response.data;
    },

    update: async (id: number | string, data: UpdateUserRequest) => {
        const response = await api.patch<AuthResponse>(`/users/${id}`, data);
        return response.data;
    },

    changePassword: async (id: number | string, data: ChangePasswordRequest) => {
        const response = await api.patch(`/users/${id}/password`, data);
        return response.data;
    },

    uploadAvatar: async (id: number | string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post<AuthResponse>(`/users/${id}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};
