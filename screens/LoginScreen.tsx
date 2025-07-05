import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { useColors } from "@/hooks/useColors";

export default function LoginScreen() {

    const { login } = useAuth();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const colors = useColors();

    const handleLogin = async () => {
        const success = await login(email, password);
        if (success) {
            return
        } else {
            setError("Identifiants incorrects. Veuillez réessayer.");
            console.error("Login failed");
        }
    }

    return (
        <SafeAreaView style={[styles.backGround, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Header>Connexion</Header>
                <Input
                    label="Email"
                    returnKeyType="next"
                    value={email}
                    onChangeText={setEmail}
                    error={!!error}
                    errorText={error ?? undefined}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <Input
                    label="Mot de passe"
                    returnKeyType="done"
                    value={password}
                    onChangeText={setPassword}
                    error={!!error}
                    errorText={error ?? undefined}
                    secureTextEntry
                />
                <Button mode="contained" onPress={handleLogin}>
                    Se connecter
                </Button>
                <Text style={styles.link} onPress={() => navigation.navigate("Register" as never)}>
                    Pas de compte ? S'inscrire
                </Text>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backGround: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    link: {
        color: "#007BFF",
        textAlign: "center",
        marginTop: 10,
    },
});