import { RegisterError, LoginError, ProductError } from "@/types/validationType";

export const validateRegister = (
    email: string,
    name: string,
    password: string
): RegisterError => {
    const errors: RegisterError = {};

    if (!email) {
        errors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "L'email n'est pas valide";
    }

    if (!name) {
        errors.name = "Le nom est requis";
    }

    if (!password) {
        errors.password = "Le mot de passe est requis";
    } else if (password.length < 6) {
        errors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    return errors;
};

export const validateLogin = (
    email: string,
    password: string
): LoginError => {
    const errors: LoginError = {};

    if (!email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = "Email is invalid";
    }

    if (!password) {
        errors.password = "Password is required";
    }

    return errors;
};

export const validateProductForm = (
    name: string,
    description: string,
    price: string,
    stock: string,
    category: string,
    image: string,
    vendeurs: string
): ProductError => {
    const errors: ProductError = {};

    if (!name) {
        errors.name = "Le nom est requis";
    }

    if (!description) {
        errors.description = "La description est requise";
    }

    if (!price) {
        errors.price = "Le prix est requis";
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
        errors.price = "Le prix doit être un nombre positif";
    }

    if (!stock) {
        errors.stock = "Le stock est requis";
    } else if (isNaN(Number(stock)) || Number(stock) < 0) {
        errors.stock = "Le stock doit être un nombre positif ou zéro";
    }

    if (!category) {
        errors.category = "La catégorie est requise";
    }

    if (!image) {
        errors.image = "L'image est requise";
    }

    if (!vendeurs) {
        errors.vendeurs = "Les vendeurs sont requis";
    }

    return errors;
};