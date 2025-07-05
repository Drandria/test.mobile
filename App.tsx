import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import AppTabs from "./navigation/AppTabs";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppNavigation() {
  // Check if the user is authenticated
  // If authenticated, show the main app tabs
  const { token } = useAuth();
  return token ? <AppTabs /> : <AuthStack />;
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AuthProvider>
  );
}