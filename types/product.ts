export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    vendeurs: string;
    image: string;
    isActive: boolean;
}

export type ProductFilter = {
    search?: string;
    category?: string;
    isActive?: boolean;
}