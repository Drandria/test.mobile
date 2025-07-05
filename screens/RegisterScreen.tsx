import { Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { validateRegister } from "@/utils/validation";
import { RegisterError } from "@/types/validationType";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Header from "@/components/Header";
import { useColors } from "@/hooks/useColors";

export default function RegisterScreen() {

    const { register } = useAuth();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<RegisterError>({});
    const colors = useColors();

    const handleRegister = async () => {

        const validationError = validateRegister(email, name, password);
        setError(validationError);

        if (Object.keys(validationError).length > 0) return;

        const success = await register(email, name, password);
        if (success) {
            return
        } else {
            setError({ register: "Cette adresse email est déjà utilisé" });
        }
    }

    return (
        <SafeAreaView style={styles.backGround}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <Header>Inscription</Header>
                <Input
                    label="Email"
                    returnKeyType="next"
                    value={email}
                    onChangeText={setEmail}
                    error={!!error.email}
                    errorText={error.email ?? undefined}
                    autoCapitalize="none"
                />
                <Input
                    label="Nom"
                    returnKeyType="next"
                    value={name}
                    onChangeText={setName}
                    error={!!error.name}
                    errorText={error.name ?? undefined}
                />
                <Input
                    label="Mot de passe"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    error={!!error.password}
                    errorText={error.password ?? undefined}
                />
                {error.register && <Text style={{ color: colors.error, textAlign: 'center' }}>{error.register}</Text>}
                <Button mode="contained" onPress={handleRegister}>
                    S'inscrire
                </Button>
                <Text style={styles.link} onPress={() => { navigation.goBack() }}>
                    Déjà un compte ? Se connecter
                </Text>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
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