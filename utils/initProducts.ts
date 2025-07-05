import AsyncStorage from '@react-native-async-storage/async-storage';
import initialProducts from '../data/products.json';

const PRODUCTS_KEY = 'products';
const PRODUCTS_LOADED_KEY = 'products_loaded';

export async function initProducts(): Promise<void> {
    const loaded = await AsyncStorage.getItem(PRODUCTS_LOADED_KEY);
    if (loaded !== 'true') {
        await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
        await AsyncStorage.setItem(PRODUCTS_LOADED_KEY, 'true');
    }
}