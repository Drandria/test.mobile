import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useColors } from "@/hooks/useColors";

type ImageInputProps = {
    image?: string;
    errorText?: string;
    onChange: (image: string) => void;
};

export default function ImageInput({ image, onChange, errorText }: ImageInputProps) {
    const colors = useColors();
    return (
        <>
            <TouchableOpacity
                style={[styles.container , { experimental_backgroundImage: image ? `url(${image})` : undefined }]}
                onPress={async () => {
                    const result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.Images,
                        allowsEditing: true,
                        aspect: [3, 4],
                        quality: 1,
                    });
                    if (!result.canceled) {
                        onChange(result.assets[0].uri);
                    }
                }}
            >
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                        ) : (
                    <>
                        <Ionicons name="add" size={24} color="#000" />
                        <Text>Importer Image</Text>
                    </>
                )}
            </TouchableOpacity>
            { errorText && <Text style={{ color: colors.error }}>{errorText}</Text> }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 200,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
        resizeMode: "cover",
    }
});    