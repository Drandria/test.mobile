import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Product } from "@/types/product";
import { AppTabParamList } from "@/types/navigation";

export function ProductCard({ product }: { product: Product }) {
    const navigation = useNavigation<NavigationProp<AppTabParamList>>();

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => navigation.navigate("Detail", { id: product.id })}
        >
            <Image
                source={{ uri: product.image || "https://i.pinimg.com/736x/91/8c/ac/918cace5327a6165fd14e4886001e0a3.jpg" }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.info}>
                <Text style={styles.title}>{ product.name }</Text>
                <Text>{ product.description } </Text>
                <View style={styles.details}>
                    <Text style={styles.price}>{ product.price } €</Text>
                    <Text style={styles.category}>{ product.category }</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 8,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    image: {
        width: "100%",
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    info: {
        padding: 16,
        gap: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
    },
    details: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    category: {
        fontSize: 14,
        color: "#666",
    },
})