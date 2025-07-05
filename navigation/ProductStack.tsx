import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductListScreen from "@/screens/ProductListScreen";
import ProductDetailScreen from "@/screens/ProductDetailScreen";
import ProductFormScreen from "@/screens/ProductFormScreen";
import { AppTabParamList } from "@/types/navigation";

const Stack = createNativeStackNavigator<AppTabParamList>();

export default function ProductStack() {
    return (
    <Stack.Navigator initialRouteName="List" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="List" component={ProductListScreen} />
        <Stack.Screen name="Detail" component={ProductDetailScreen} />
        <Stack.Screen name="Form" component={ProductFormScreen} />
    </Stack.Navigator>
  );
}