import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export function useColors() {
    const theme = useColorScheme() ?? "light";
    return Colors[theme];
}