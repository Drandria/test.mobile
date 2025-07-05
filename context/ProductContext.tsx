import React, { createContext, useContext, useEffect, useState, ReactNode, use } from 'react';
import { Product, ProductFilter } from '@/types/product';
import {
    getProducts,
    addProduct as addProductService,
    updateProduct as updateProductService,
    deleteProduct as deleteProductService
} from '@/services/product.service';
import { initProducts } from '@/utils/initProducts';

type ProductContextType = {
    products: Product[];
    loading: boolean;
    filter: ProductFilter;
    setFilter: (filter: ProductFilter) => void;
    fetchProducts: () => Promise<void>;
    addProduct: (product: Product) => Promise<void>;
    updateProduct: (product: Product) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<ProductFilter>({ search: '' });

    const fetchProducts = async () => {
        setLoading(true);
        const data = await getProducts(filter);
        setProducts(data);
        setLoading(false);
    };

    const addProduct = async (product: Product) => {
        await addProductService(product);
        await fetchProducts();
    };

    const updateProduct = async (product: Product) => {
        await updateProductService(product);
        await fetchProducts();
    };

    const deleteProduct = async (id: string) => {
        await deleteProductService(id);
        await fetchProducts();
    };

    useEffect(() => {
        initProducts();
        fetchProducts();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [filter]);

    return (
        <ProductContext.Provider value={{ 
            products, 
            loading,
            filter,
            setFilter, 
            fetchProducts, 
            addProduct, 
            updateProduct, 
            deleteProduct 
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
