import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Product } from "@/types/product";
import { AppTabParamList } from "@/types/navigation";
import Badge from "./Badge";
import { useColors } from "@/hooks/useColors";

export function ProductCard({ product }: { product: Product }) {
    const navigation = useNavigation<NavigationProp<AppTabParamList>>();
    const colors = useColors();

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
                <View>
                    <Text style={[ styles.title, { color: colors.text } ]}>{ product.name }</Text>
                    <Text style={[{ color: colors.textSecondary }]}>{ product.description } </Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.price}>{ product.price } €</Text>
                    <Badge label={product.category}/>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: 400,
        maxHeight: 520,
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
        height: 400,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    info: {
        padding: 16,
        gap: 10,
    },
    title: {
        fontSize: 20,
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
    }
})