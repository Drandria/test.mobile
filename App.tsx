import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./navigation/AuthStack";
import AppTabs from "./navigation/AppTabs";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppNavigation() {
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