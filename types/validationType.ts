export type RegisterError = {
    email?: string;
    name?: string;
    password?: string;
}

export type LoginError = {
    email?: string;
    password?: string;
    log?: string;
}