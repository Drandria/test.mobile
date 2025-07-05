import { useState, useEffect } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/AuthContext';
import { updateUserInStorage } from '@/services/user.service';

export default function ProfileScreen() {
    const { user, setUser, logout } = useAuth(); // Ajoute `setUser` dans ton context
    const [profile, setProfile] = useState(user);

    useEffect(() => {
        setProfile(user); // Met à jour le local state quand le user change
    }, [user]);

    const handleSave = async () => {
        if (!profile) return;

        await updateUserInStorage(profile);
        setUser(profile); // Met à jour aussi le contexte
        alert('Profil mis à jour !');
    };

    if (!profile) return <Text>Chargement...</Text>;

    return (
        <SafeAreaView>
            <TextInput value={profile.name} onChangeText={name => setProfile({ ...profile, name })} />
            <TextInput value={profile.email} onChangeText={email => setProfile({ ...profile, email })} />
            <Button title="Sauvegarder" onPress={handleSave} />
            <Button onPress={logout} title='Se déconnecter'/>
        </SafeAreaView>
    );
}