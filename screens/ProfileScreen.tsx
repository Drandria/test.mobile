import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
    const { logout } = useAuth();

    return (
        <View>
            <Button onPress={logout} title='Se déconnecter'/>
        </View>
    );
}