import { useState, useEffect } from 'react';
import { Text, KeyboardAvoidingView, ScrollView, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { updateUserInStorage } from '@/services/user.service';
import { useColors } from '@/hooks/useColors';
import { ScreenTitle } from '@/components/ScreenTitle';
import Input from '@/components/Input';
import Button from '@/components/Button';
import BorderButton from '@/components/BorderButton';
import { validateProfileForm } from '@/utils/validation';
import { ProfileError } from '@/types/validationType';

export default function ProfileScreen() {
    const { user, setUser, logout } = useAuth();
    const [profile, setProfile] = useState(user);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [error, setError] = useState<ProfileError>({});
    const colors = useColors();

    useEffect(() => {
        setProfile(user);
    }, [user]);

    const handleSave = async () => {
        if (!profile) return;
        const validationError = validateProfileForm(profile.name, profile.email);
        if (Object.keys(validationError).length > 0) {
            setError(validationError);
            return;
        }
        await updateUserInStorage(profile);
        setUser(profile);
        setShowSuccessModal(true);
    };

    if (!profile) return <Text>Chargement...</Text>;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]} edges={['top']}>
            <ScreenTitle title="Profile"/>
            <KeyboardAvoidingView style={[styles.body, { backgroundColor: colors.background }]} behavior="padding">
                <ScrollView>
                    <Input
                        label="Nom"
                        value={profile.name}
                        onChangeText={(text: string) => setProfile({ ...profile, name: text })}
                        errorText={error.name}
                        error={!!error.name}
                    />
                    <Input
                        label="Email"
                        value={profile.email}
                        onChangeText={(text: string) => setProfile({ ...profile, email: text })}
                        errorText={error.email}
                        error={!!error.email}
                    />

                    {profile?.isMock && (
                        <Text style={{ color: colors.error, marginVertical: 8, textAlign: "center" }}>
                            Ce profil ne peut pas être modifié.
                        </Text>
                    )}

                    <Button mode="contained" onPress={handleSave} disabled={profile?.isMock}>
                        Mettre à jour
                    </Button>
                    <BorderButton mode="outlined" onPress={logout}>
                        Se déconnecter
                    </BorderButton>
                </ScrollView> 
            </KeyboardAvoidingView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={showSuccessModal}
                onRequestClose={() => setShowSuccessModal(false)}
            >
                <SafeAreaView style={modalStyles.overlay}>
                    <SafeAreaView style={modalStyles.modalContent}>
                        <Text style={modalStyles.title}>Succès</Text>
                        <Text style={modalStyles.message}>Profil mis à jour avec succès !</Text>
                        <Button onPress={() => setShowSuccessModal(false)}>Fermer</Button>
                    </SafeAreaView>
                </SafeAreaView>
            </Modal>
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
});

const modalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
});