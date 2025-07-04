export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    vendeurs: string | null;
    image: string | null;
    isActive: boolean;
}