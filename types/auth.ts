export type User = {
    id: string;
    email: string;
    name: string;
    password: string;
};

export type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => boolean;
    register: (email: string, name: string, password: string) => boolean;
    logout: () => void;
};