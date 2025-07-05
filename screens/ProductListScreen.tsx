import { View, StyleSheet, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenTitle } from "@/components/ScreenTitle";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { useColors } from "@/hooks/useColors";
import { useProducts } from "@/context/ProductContext";


export default function ProductListScreen() {
	const [search, setSearch] = useState<string>("");
	const { products, loading, setFilter } = useProducts();
	const colors = useColors();

	useEffect(() => {
		setFilter({ search });
	}, [search]);

	return (
		<SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]} edges={['top']}>
			<ScreenTitle title="Product List" />
			<View style={styles.filter}>
				<SearchBar value={search} onChange={setSearch}/>
			</View>
			<View style={[styles.body, { backgroundColor: colors.background }]}>
				<FlatList
					data={products}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<ProductCard product={item} />
					)}
					contentContainerStyle={{ gap: 16 }}
					ListEmptyComponent={loading ? <Text>Loading...</Text> : <Text>No products found.</Text>}
				/>
			</View>
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
	filter: {
		width: "100%",
		flexDirection: "row",
		paddingHorizontal: 16,
	}
});