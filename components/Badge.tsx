import { View, Text, StyleSheet } from "react-native";
import { useColors } from "@/hooks/useColors";

type props = {
    label?: string
}

export default function Badge({label}: props) {
    const colors = useColors();
    return (
        <View style={[ style.container, { backgroundColor: colors.secondary }]}>
            <Text style={[{ color: colors.background }]}>{label}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 4,
        borderRadius: 4
    }
})