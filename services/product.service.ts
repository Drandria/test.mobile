import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product, ProductFilter } from "../types/product";

const PRODUCTS_KEY = 'products';
const PRODUCTS_LOADED_KEY = 'products_loaded';

export async function getProducts(filter?: ProductFilter): Promise<Product[]> {
    const data = await AsyncStorage.getItem(PRODUCTS_KEY)
    const products: Product[] = data ? JSON.parse(data) : []; 

    if (!filter) {
        return products.map(product => ({
            ...product,
            image: product.image === null ? "" : product.image
        }));
    }

    const { search, isActive = true, category } = filter;

    return products
        .filter((product) => {
            const matchActive = product.isActive === isActive;

            const matchSearch =
                !search ||
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.description.toLowerCase().includes(search.toLowerCase());

            const matchCategory = !category || product.category.toLowerCase() === category.toLowerCase();

            return matchActive && matchSearch && matchCategory;
        })
        .map(product => ({
            ...product,
            image: product.image === null ? "" : product.image
        }));
}

export async function getProductById(id: string): Promise<Product | undefined> {
    const data = await AsyncStorage.getItem(PRODUCTS_KEY);
    const products: Product[] = data ? JSON.parse(data) : [];

    const product = products.find((product) => product.id === id);
    if (!product) return undefined;
    return {
        ...product,
        image: product.image === null ? "" : product.image
    };
}

export async function addProduct(newProduct: Product): Promise<void> {
    const products = await getProducts();
    newProduct.id = Math.random().toString(36).substring(7);
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify([...products, newProduct]));
}

export async function updateProduct(updated: Product): Promise<void> {
    const products = await getProducts();
    const newProducts = products.map(p => (p.id === updated.id ? updated : p));
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(newProducts));
}

export async function deleteProduct(id: string): Promise<void> {
    const products = await getProducts();
    const newProducts = products.filter(p => p.id !== id);
    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(newProducts));
}