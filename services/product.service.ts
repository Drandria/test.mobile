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