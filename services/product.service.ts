import products from "../data/products.json";
import { Product, ProductFilter } from "../types/product";



export function getProducts(filter?: ProductFilter): Product[] {
    if (!filter) {
        return products;
    }

    const { search, isActive = true, category } = filter;

    return products.filter((product) => {
        const matchActive = product.isActive === isActive;

        const matchSearch =
            !search ||
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase());

        const matchCategory = !category || product.category.toLowerCase() === category.toLowerCase();

        return matchActive && matchSearch && matchCategory;
    });
}

export function getProductById(id: string): Product | undefined {
    return products.find((product) => product.id === id);
}

export function deleteProduct(id: string): void {
    const index = products.findIndex((product) => product.id === id);
    if (index !== -1) {
        products.splice(index, 1);
    }
}