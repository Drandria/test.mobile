import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductStack from './ProductStack';
import ProductFormScreen from '@/screens/ProductFormScreen';
import ProfileScreen from '@/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Produit" component={ProductStack} />
        <Tab.Screen name="Form" component={ProductFormScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}