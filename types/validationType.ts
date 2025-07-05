export type RegisterError = {
    email?: string;
    name?: string;
    password?: string;
    register?: string;
}

export type LoginError = {
    email?: string;
    password?: string;
    log?: string;
}

export type ProductError = {
    name?: string;
    description?: string;
    price?: string;
    stock?: string;
    category?: string;
    image?: string;
    vendeurs?: string;
    product?: string;
}