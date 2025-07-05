import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/auth';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'user';

export async function updateUserInStorage(updatedUser: User): Promise<void> {
    const storedUsers = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    const updatedUsers = users.map(u => {
        if (u.id === updatedUser.id) {
            return {
                ...updatedUser,
                password: u.password
            };
        }
        return u;
    });

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    const { password, ...userWithoutPassword } = updatedUser;
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
}
