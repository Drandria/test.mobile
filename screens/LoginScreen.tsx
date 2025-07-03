import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function LoginScreen() {

    const { login } = useAuth();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        const success = await login(email, password);
        if (success) {
            navigation.reset({
                index: 0,
                routes: [{ name: "ProductList" as never }],
            });
        } else {
            setError("Identifiants incorrects. Veuillez réessayer.");
            console.error("Login failed");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder="Mot de passe"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}
            <Button title="Se connecter" onPress={ handleLogin } />
            <Text style={styles.link} onPress={() => { navigation.navigate("Register" as never) }}>
                Pas de compte ? S'inscrire
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 20,
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