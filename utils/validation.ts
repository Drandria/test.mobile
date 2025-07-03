import { RegisterError, LoginError } from "@/types/validationType";

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