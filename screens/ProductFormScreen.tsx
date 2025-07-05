import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { Product } from '@/types/product';
import { getProductById } from '@/services/product.service';

export default function ProductFormScreen() {
    const route = useRoute();
    const params = route.params as { id?: string } | undefined;
    const id: string | undefined = params?.id;
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
    }
    const productFound = id ? getProductById(id) : null;
    const [product, setProduct] = useState<Product>(productFound ?? emptyProduct);

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top']}>
            <View style={styles.container}>
                <Text style={styles.title}>{id ? 'Modifier le produit' : 'Ajouter un nouveau produit'}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nom du produit"
                    value={product.name}
                    onChangeText={(text) => setProduct({ ...product, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={product.description}
                    onChangeText={(text) => setProduct({ ...product, description: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Prix"
                    value={product.price?.toString()}
                    keyboardType="numeric"
                    onChangeText={(text) => setProduct({ ...product, price: parseFloat(text) })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Catégorie"
                    value={product.category}
                    onChangeText={(text) => setProduct({ ...product, category: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Vendeur"
                    value={product.vendeurs ?? ''}
                    onChangeText={(text) => setProduct({ ...product, vendeurs: text })}
                />
                    {product.id ? (
                        <Button
                            title="Mettre à jour le produit"
                            onPress={() => {
                                // Logic to update the product
                                console.log('Produit mis à jour:', product);
                            }}
                        />
                    ) : (
                        <Button
                            title="Ajouter le produit"
                            onPress={() => {
                                // Logic to add the new product
                                console.log('Nouveau produit ajouté:', product);
                            }}
                        />
                    )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 12,
    },
});