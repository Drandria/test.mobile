import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

export default function RegisterScreen() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>S'inscrire</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Nom"
                style={styles.input}
            />
            <TextInput
                placeholder="Mot de passe"
                style={styles.input}
                secureTextEntry
            />
            <Button title="S'inscrire" onPress={() => {}} />
            <Text style={styles.link} onPress={() => { navigation.goBack() }}>
                Déjà un compte ? Se connecter
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 20,
        paddingTop: 50,
        backgroundColor: "#fff",
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    link: {
        color: "#007BFF",
        textAlign: "center",
        marginTop: 10,
    },
});