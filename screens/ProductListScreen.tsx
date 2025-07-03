import { View, Text, Button } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";


export default function ProductListScreen() {
    const { logout } = useAuth();
    const navigation = useNavigation();

    const handleLogout = () => {
        logout();
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" as never }],
        });
    }

  return (
    <View>
      <Text>Product List Screen</Text>
        <Button title="Logout" onPress={ handleLogout } />
    </View>
  );
}