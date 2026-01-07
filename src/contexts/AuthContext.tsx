'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService, AuthResponse, LoginRequest } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: AuthResponse | null;
    setUser: (user: AuthResponse | null) => void;
    login: (data: LoginRequest) => Promise<AuthResponse>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = () => {
            const currentUser = authService.getCurrentUser();
            setUser(currentUser);
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const login = async (data: LoginRequest) => {
        try {
            const response = await authService.login(data);
            setUser(response);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        router.push('/');
        router.refresh();
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
