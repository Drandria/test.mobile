import { View, StyleSheet, FlatList, Text } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect, useNavigation, useRoute, NavigationProp, RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenTitle } from "@/components/ScreenTitle";
import { getProducts } from "@/services/product.service";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { initProducts } from "@/utils/initProducts";
import { Product } from "@/types/product";
import { AppTabParamList } from "@/types/navigation";

export default function ProductListScreen() {
	const [search, setSearch] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [products, setProducts] = useState<Product[]>([]);
	const navigation = useNavigation<NavigationProp<AppTabParamList,"List">>();
	const route = useRoute<RouteProp<AppTabParamList,"List">>();

	useEffect(() => {
		initProducts();
	},[]);


	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			const result = await getProducts(search.trim() ? { search } : undefined);
			setProducts(result);
			setLoading(false);
		};
		fetchProducts();
	}, [search]);

	useFocusEffect(
        useCallback(() => {
            const refresh = route.params?.refresh;

            if (refresh) {
                const load = async () => {
                    const all = await getProducts();
                    setProducts(all);
                };
                load();

                navigation.setParams({ refresh: false });
            }
        }, [route.params])
    );

	return (
		<SafeAreaView style={styles.container} edges={['top']}>
			<ScreenTitle title="Product List" />
			<View style={styles.filter}>
				<SearchBar value={search} onChange={setSearch}/>
			</View>
			<View style={styles.body}>
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