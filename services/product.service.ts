import products from "../data/products.json";
import { Product } from "../types/product";

export function getProducts(): Product[] {
  return products;
}