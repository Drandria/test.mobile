import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { useState, useEffect, use } from 'react';
import { Product } from '@/types/product';
import { getProductById } from '@/services/product.service';
import { AppTabParamList, TabParamList } from '@/types/navigation';
import { ScreenTitle } from '@/components/ScreenTitle';
import { useColors } from '@/hooks/useColors';
import Input from '@/components/Input';
import { useProducts } from '@/context/ProductContext';
import Button from '@/components/Button';
import ImageInput from '@/components/ImageInput';
import { validateProductForm } from '@/utils/validation';
import { ProductError } from '@/types/validationType';


export default function ProductFormScreen() {
    const route = useRoute<RouteProp<AppTabParamList,"List">>();
    const navigation = useNavigation<NavigationProp<AppTabParamList,"List">>();
    const navigationTab = useNavigation<NavigationProp<TabParamList,"Produit">>();
    const params = route.params as { id?: string } | undefined;
    const id: string | undefined = params?.id;
    const colors = useColors();
    const { addProduct, updateProduct } = useProducts();
    const [error,setError] = useState<ProductError>({});

    const emptyProduct: Product = {
        id: '',
        name: '',
        description: '',
        price: 0,
        category: '',
        stock: 0,
        image: '',
        isActive: true,
        vendeurs: '',
    };

    const [product, setProduct] = useState<Product>(emptyProduct);
    const [priceText, setPriceText] = useState<string>(product.price.toString());
    const [stockText, setStockText] = useState<string>(product.stock.toString());

    useEffect(() => {
        if (id) {
            getProductById(id).then((found) => {
                if (found) setProduct(found);
            });
        }
    }, [id]);

    const handleSave = () => {
        const price = parseFloat(priceText);
        const stock = parseInt(stockText);

        const validationError = validateProductForm(
            product.name,
            product.description,
            priceText,
            stockText,
            product.category,
            product.image,
            product.vendeurs
        );
        setError(validationError);
        if (Object.keys(validationError).length > 0) return;

        const updatedProduct = { ...product, price, stock };
        if (id) {
            updateProduct({ ...updatedProduct, id });
            navigation.reset(
                {
                    index: 0,
                    routes: [{ name: "List" }],
                }
            );
        } else {
            addProduct(updatedProduct);
            navigationTab.navigate("Produit");
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]} edges={['top']}>
            <ScreenTitle title={ id ? "Modifier Produit" : "Ajouter Produit" } />
            <KeyboardAvoidingView style={[styles.body, { backgroundColor: colors.background }]} behavior="padding">
                <ScrollView>
                    <ImageInput
                        image={product.image}
                        onChange={(image: string) => setProduct({ ...product, image })}
                        errorText={error.image}
                    />
                    <Input
                        label="Nom"
                        value={product.name}
                        onChangeText={(text: string) => setProduct({ ...product, name: text })}
                        errorText={error.name}
                        error={!!error.name}
                    />
                    <Input
                        label="Description"
                        value={product.description}
                        onChangeText={(text: string) => setProduct({ ...product, description: text })}
                        multiline
                        numberOfLines={4}
                        errorText={error.description}
                        error={!!error.description}
                    />
                    <Input
                        label="Prix"
                        value={priceText}
                        onChangeText={setPriceText}
                        keyboardType="numeric"
                        errorText={error.price}
                        error={!!error.price}
                    />
                    <Input
                        label="Catégorie"
                        value={product.category}
                        onChangeText={(text: string) => setProduct({ ...product, category: text })}
                        errorText={error.category}
                        error={!!error.category}
                    />
                    <Input
                        label="Stock"
                        value={stockText}
                        keyboardType="numeric"
                        onChangeText={setStockText}
                        errorText={error.stock}
                        error={!!error.stock}
                    />
                    <Input
                        label="Vendeurs"
                        value={product.vendeurs}
                        onChangeText={(text: string) => setProduct({ ...product, vendeurs: text })}
                        errorText={error.vendeurs}
                        error={!!error.vendeurs}
                    />
                    <Button mode="contained" onPress={handleSave}>
                        {id ? "Modifier" : "Ajouter"}
                    </Button>
                </ScrollView> 
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "blue",
		padding: 4,

		gap: 16,
	},
	body: {
		flex: 1,
		backgroundColor: "#f8f8f8",
		borderRadius: 8,
		padding: 16,
	},
});