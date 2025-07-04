import { View, StyleSheet, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenTitle } from "@/components/ScreenTitle";
import { getProducts } from "@/services/product.service";
import { ProductCard } from "@/components/ProductCard";

export default function ProductListScreen() {
	const products = getProducts();

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			<ScreenTitle title="Product List" />
			<View style={styles.body}>
				<FlatList
					data={products}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<ProductCard product={item} />
					)}
					contentContainerStyle={{ gap: 16 }}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "red",
		padding: 4,
	},
	body: {
		flex: 1,
		backgroundColor: "#f8f8f8",
		borderRadius: 8,
		padding: 16,
	}
});