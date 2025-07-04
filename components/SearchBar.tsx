import { View, TextInput, Image, StyleSheet } from "react-native";

type Props = {
    value: string;
    onChange: (text: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
    return (
        <View style= {styles.wrapper}>
            <Image 
                source={require("../assets/images/search.png")} 
                style={{ width: 16, height: 16 }} 
            />
            <TextInput style={styles.input} onChangeText={onChange} value={value} placeholder="Search"/>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        paddingHorizontal: 12,
        borderRadius: 8,
        height: 40,
        
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    
    input: {
        flex: 1,
        height: "100%",
    }
})