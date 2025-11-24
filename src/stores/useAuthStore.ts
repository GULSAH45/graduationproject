import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
}

interface AuthState {
    users: User[];
    currentUser: User | null;
    register: (user: User) => boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    updateUser: (updatedUser: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            users: [],
            currentUser: null,
            register: (newUser) => {
                const { users } = get();
                const existingUser = users.find((u) => u.email === newUser.email);
                if (existingUser) {
                    return false; // User already exists
                }
                set({ users: [...users, newUser] });
                return true;
            },
            login: (email, password) => {
                const { users } = get();
                const user = users.find((u) => u.email === email && u.password === password);
                if (user) {
                    set({ currentUser: user });
                    return true;
                }
                return false;
            },
            logout: () => set({ currentUser: null }),
            updateUser: (updatedUser) => {
                const { users, currentUser } = get();
                if (!currentUser) return;

                const newUserData = { ...currentUser, ...updatedUser };

                // Update in users array
                const updatedUsers = users.map((u) =>
                    u.email === currentUser.email ? newUserData : u
                );

                set({
                    users: updatedUsers,
                    currentUser: newUserData
                });
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
