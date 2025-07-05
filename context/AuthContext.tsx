import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User, AuthContextType } from '@/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockUsers } from '../data/users';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        const loadUserFromStorage = async () => {
            const storedUser = await AsyncStorage.getItem('user')
            if (storedUser) {
                setUser(JSON.parse(storedUser));
                setToken('fake-token');
            }
            setIsLoading(false);
        }

        loadUserFromStorage();
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        const storedUsers = await AsyncStorage.getItem('users');
        const persistedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

        const allUsers = [...mockUsers, ...persistedUsers];
        
        const foundUser = allUsers.find(
            u => u.email === email && u.password === password
        );

        if (foundUser) {
            const { password: _, ...userWithoutPassword } = foundUser;

            setUser(userWithoutPassword);
            setToken('fake-token');
            await AsyncStorage.setItem('user', JSON.stringify(userWithoutPassword));
            return true;
        }
        return false;
    };

    const register = async (email: string, name: string, password: string): Promise<boolean> => {
        const storedUsers = await AsyncStorage.getItem('users');
        const persistedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

        const allUsers = [...mockUsers, ...persistedUsers];
        
        if (allUsers.find(u => u.email === email)) {
            return false;
        }

        const newUser: User = {
            id: Math.random().toString(36).substring(7),
            email,
            name,
            password
        };

        const updatedUsers = [...persistedUsers, newUser];
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

        const { password: _, ...userWithoutPassword } = newUser;

        setUser(userWithoutPassword);
        setToken('fake-token');
        await AsyncStorage.setItem('user', JSON.stringify(userWithoutPassword));
        return true;
    };

    const logout = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem('user');
    };
    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, setUser }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};