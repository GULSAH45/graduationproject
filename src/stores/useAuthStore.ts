import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin, register as apiRegister, me as apiMe, API_KEY } from '@/services/collections/Auth';

interface User {
    id?: number;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
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
                    await apiRegister(apiData);
                    return true;
                } catch (error) {
                    console.error('Register error:', error);
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
                    const response = await apiLogin(apiData);
                    const token = response.access_token;
                    console.log(response)
                    if (token) {
                        set({ accessToken: token });

                        // Fetch user details
                        try {
                            const userResponse = await apiMe(token);
                            const user: User = {
                                ...userResponse,
                                firstName: userResponse.first_name,
                                lastName: userResponse.last_name,
                            };
                            set({ currentUser: user });
                            console.log("User logged in successfully:", user);
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
            partialize: (state) => ({ accessToken: state.accessToken }),
        }
    )
);
