import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '@/screens/ProductDetailScreen';
import ProductFormScreen from '@/screens/ProductFormScreen';
import ProfileScreen from '@/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="List" component={ProductListScreen} />
        <Tab.Screen name="Detail" component={ProductDetailScreen} />
        <Tab.Screen name="Form" component={ProductFormScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}