import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { getProductById } from "@/services/product.service";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AppTabParamList } from "@/types/navigation";
import { Product } from "@/types/product";
import { useProducts } from "@/context/ProductContext";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import BorderButton from "@/components/BorderButton";

export default function ProductDetailScreen() {
	const [product, setProduct] = useState<Product | null>(null);
	const route = useRoute();
	const { id } = route.params as { id: string };
	const navigation = useNavigation<NavigationProp<AppTabParamList>>();
	const { deleteProduct } = useProducts();

	useEffect(() => {
        if (id) {
            getProductById(id).then((found) => {
                if (found) setProduct(found);
            });
        }
    }, [id]);

	const handleDelete = () => {
		deleteProduct(id);
		navigation.goBack();
	}
	if (!product) {
		return (
			<SafeAreaView style={styles.container} edges={['top']}>
				<Text>Product not found</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			<ScrollView>
				<Image
					source={{ uri: product?.image || "https://i.pinimg.com/736x/91/8c/ac/918cace5327a6165fd14e4886001e0a3.jpg" }}
					style={styles.image}
					resizeMode="cover"
				/>
				<View style={styles.info}>
					<View>
						<Text style={styles.title}>{product?.name}</Text>
						<Text style={styles.description}>{product?.description}</Text>
					</View>
					<View style={styles.details}>
						<Text style={styles.price}>{product?.price} €</Text>
						<Badge label={product?.category} />
					</View>
					<View style={styles.details}>
						<Text style={styles.stock}>Stock: {product?.stock}</Text>
						<Text style={styles.vendeurs}>Vendeur: {product?.vendeurs}</Text>
					</View>
					<Button mode="contained" onPress={() => navigation.navigate("Form", { id: product.id })}>
						Modifier
					</Button>
					<BorderButton onPress={handleDelete} color="red">
						Supprimer
					</BorderButton>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f8f8",
	},
	image: {
		width: "100%",
		height: 400,
		marginBottom: 16,
	},
	info: {
		paddingHorizontal: 32,
		gap: 16,
	},
	title: {
		fontSize: 32,
		fontWeight: "semibold",
	},
	description: {
		fontSize: 16,
		color: "#666",
	},
	details: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	price: {
		fontSize: 24,
		fontWeight: "regular",
		color: "#000",
		marginBottom: 8,
	},
	stock: {
		fontSize: 16,
		color: "#333",
		marginBottom: 4,
	},
	category: {
		fontSize: 16,
		color: "#333",
		marginBottom: 4,
	},
	vendeurs: {
		fontSize: 16,
		color: "#333",
		marginBottom: 4,
	}
});