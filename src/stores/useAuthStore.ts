import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, register as apiRegister, me as apiMe, API_KEY } from '@/services/collections/Auth';

interface User {
    data: {
        id?: number;
        email: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
        first_name?: string;
        last_name?: string;
    }
}

interface AuthState {
    accessToken: string | null;
    currentUser: User | null;
    register: (user: any) => Promise<boolean>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    updateUser: (updatedUser: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            currentUser: null,
            register: async (userData) => {
                try {
                    const apiData = {
                        email: userData.email,
                        password: userData.password,
                        password2: userData.password, // Assuming password confirmation is same as password
                        first_name: userData.firstName,
                        last_name: userData.lastName,
                        api_key: API_KEY,
                    };
                    console.log('Sending registration data:', { ...apiData, password: '***', password2: '***' });
                    const response = await apiRegister(apiData);
                    console.log('Registration successful:', response);
                    return true;
                } catch (error: any) {
                    console.error('Register error:', error);
                    console.error('Error response:', error.response?.data);
                    console.error('Error status:', error.response?.status);

                    // Return error message if available
                    if (error.response?.data) {
                        throw new Error(JSON.stringify(error.response.data));
                    }
                    return false;
                }
            },
            login: async (email, password) => {
                try {
                    const apiData = {
                        username: email, // Map email to username
                        password: password,
                        api_key: API_KEY,
                    };
                    console.log('Attempting login...');
                    const response = await apiLogin(apiData);
                    const token = response.access_token;
                    if (token) {
                        console.log('Login successful, token received');
                        set({ accessToken: token });

                        // Fetch user details
                        try {
                            console.log('Fetching user details...');
                            const userResponse = await apiMe(token);
                            console.log('User response from API:', userResponse);
                            const user: User = {
                                data: {
                                    ...userResponse,
                                    firstName: userResponse.first_name,
                                    lastName: userResponse.last_name,
                                }
                            };
                            console.log('Structured user object:', user);
                            set({ currentUser: user });
                            console.log('User saved to store');
                            return true;
                        } catch (meError) {
                            console.error('Error fetching user details:', meError);
                            return false;
                        }
                    }
                    return false;
                } catch (error) {
                    console.error('Login error:', error);
                    return false;
                }
            },
            logout: () => set({ accessToken: null, currentUser: null }),
            updateUser: (updatedUser) => {
                const { currentUser } = get();
                if (!currentUser) return;

                const newUserData = { ...currentUser, ...updatedUser };
                set({ currentUser: newUserData });
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ accessToken: state.accessToken, currentUser: state.currentUser }),
        }
    )
);

// Debug: Check storage on load
AsyncStorage.getItem('auth-storage').then(data => {
    console.log('AsyncStorage auth-storage:', data);
    if (data) {
        const parsed = JSON.parse(data);
        console.log('Parsed auth storage:', parsed);
    }
});
