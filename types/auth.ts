export type User = {
    id: string;
    email: string;
    name: string;
    password: string;
};

export type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, name: string, password: string) => Promise<boolean>;
    logout: () => void;
};