import { Text, View, StyleSheet } from "react-native";

type Props = {
    title: string;
}

export function ScreenTitle({ title }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
    },
});