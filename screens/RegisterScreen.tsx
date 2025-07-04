import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { validateRegister } from "@/utils/validation";
import { RegisterError } from "@/types/validationType";

export default function RegisterScreen() {

    const { register } = useAuth();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<RegisterError>({});

    const handleRegister = async () => {

        const validationError = validateRegister(email, name, password);
        setError(validationError);

        if (Object.keys(validationError).length > 0) return;

        const success = await register(email, name, password);
        if (success) {
            return
        } else {
            console.error("Registration failed");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            { error.email && <Text style={{ color: "red", marginBottom: 10 }}>{error.email}</Text> }
            
            <TextInput
                placeholder="Nom"
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            { error.name && <Text style={{ color: "red", marginBottom: 10 }}>{error.name}</Text> }

            <TextInput
                placeholder="Mot de passe"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            { error.password && <Text style={{ color: "red", marginBottom: 10 }}>{error.password}</Text> }

            <Button title="S'inscrire" onPress={ handleRegister } />
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