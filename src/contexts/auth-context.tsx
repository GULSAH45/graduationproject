import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { me as apiMe } from '@/services/collections/Auth';

interface AuthContextType {
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    isLoading: true,
    isAuthenticated: false,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const { accessToken, currentUser, logout } = useAuthStore();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Eğer token varsa ama user yoksa, user bilgilerini fetch et
                if (accessToken && !currentUser) {
                    try {
                        const userResponse = await apiMe(accessToken);
                        const user = {
                            data: {
                                ...userResponse,
                                firstName: userResponse.first_name,
                                lastName: userResponse.last_name,
                            }
                        };
                        useAuthStore.setState({ currentUser: user });
                    } catch (error) {
                        console.error('Token geçersiz, çıkış yapılıyor:', error);
                        // Token geçersizse logout yap
                        logout();
                    }
                }
            } catch (error) {
                console.error('Auth kontrol hatası:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [accessToken, currentUser, logout]);

    const value = {
        isLoading,
        isAuthenticated: !!accessToken && !!currentUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
