import React, { createContext, useState, ReactNode } from 'react';
import { User, AuthContextType } from '../types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockUsers } from '../data/users';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = async (email: string, password: string): Promise<boolean> => {
        const foundUser = mockUsers.find(
            u => u.email === email && u.password === password
        );

        if (foundUser) {
            setUser(foundUser);
            setToken('fake-token');
            await AsyncStorage.setItem('user', JSON.stringify(foundUser));
            return true;
        }
        return false;
    };

    const register = async (email: string, name: string, password: string): Promise<boolean> => {
        const newUser: User = {
            id: Math.random().toString(36).substring(7),
            email,
            name,
            password
        };
        mockUsers.push(newUser);
        setUser(newUser);
        setToken('fake-token');
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        return true;
    };

    const logout = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem('user');
    };
    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
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