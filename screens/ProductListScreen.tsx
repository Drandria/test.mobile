import { View, StyleSheet, FlatList, Text } from "react-native";
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenTitle } from "@/components/ScreenTitle";
import { getProducts } from "@/services/product.service";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/product";
import { SearchBar } from "@/components/SearchBar";

export default function ProductListScreen() {
	const [search, setSearch] = useState<string>("");

	const filteredProducts = useMemo(() => {
		if(!search.trim()) return getProducts();
		return getProducts({search});
	}, [search]);

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			<ScreenTitle title="Product List" />
			<View style={styles.filter}>
				<SearchBar value={search} onChange={setSearch}/>
			</View>
			<View style={styles.body}>
				<FlatList
					data={filteredProducts}
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

		gap: 16,
	},
	body: {
		flex: 1,
		backgroundColor: "#f8f8f8",
		borderRadius: 8,
		padding: 16,
	},
	filter: {
		width: "100%",
		flexDirection: "row",
		paddingHorizontal: 16,
	}
});