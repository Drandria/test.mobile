import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductStack from './ProductStack';
import ProductFormScreen from '@/screens/ProductFormScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { ProductProvider } from '@/context/ProductContext';
import { TabParamList } from '@/types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

// Define application tabs navigation

export default function AppTabs() {
  const colors = useColors();
  return (
    <ProductProvider>
        <Tab.Navigator 
            screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
            let iconName: React.ComponentProps<typeof Ionicons>['name'];

            if (route.name === 'Produit') {
                iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'Add') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName!} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: 'gray',
        })}
        >
            <Tab.Screen name="Produit" component={ProductStack} />
            <Tab.Screen name="Add" component={ProductFormScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    </ProductProvider>
  );
}