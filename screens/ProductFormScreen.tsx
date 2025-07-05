import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { getProductById, updateProduct, addProduct, deleteProduct } from '@/services/product.service';
import { AppTabParamList } from '@/types/navigation';


export default function ProductFormScreen() {
    const route = useRoute<RouteProp<AppTabParamList,"List">>();
    const navigation = useNavigation<NavigationProp<AppTabParamList,"List">>();
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
    };

    const [product, setProduct] = useState<Product>(emptyProduct);

    useEffect(() => {
        if (id) {
            getProductById(id).then((found) => {
                if (found) setProduct(found);
            });
        }
    }, [id]);

    const handleSave = () => {
        if (id) {
            updateProduct(product);
            Alert.alert("Succès", "Produit mis à jour !");
        } else {
            addProduct(product);
            Alert.alert("Succès", "Produit ajouté !");
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'List', params: { refresh: true } }],
        });
    };

    const handleDelete = () => {
        Alert.alert(
            "Confirmation",
            "Supprimer ce produit ?",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: () => {
                        if (id) {
                            deleteProduct(id);
                            Alert.alert("Supprimé", "Produit supprimé.");
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'List' }],
                            });
                        }
                    }
                }
            ]
        );
    };

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
                    onChangeText={(text) => setProduct({ ...product, price: parseFloat(text) || 0 })}
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

                <Button
                    title={id ? "Mettre à jour le produit" : "Ajouter le produit"}
                    onPress={handleSave}
                />

                {id && (
                    <View style={{ marginTop: 12 }}>
                        <Button
                            title="Supprimer le produit"
                            color="red"
                            onPress={handleDelete}
                        />
                    </View>
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