import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useColors } from '@/hooks/useColors';


type InputProps = {
  errorText?: string;
  description?: string;
  [key: string]: any;
};

export default function Input({ errorText, description, ...props }: InputProps) {
    const colors = useColors();
    
    return (
        <View style={styles.container}>
        <TextInput
            style={[{ backgroundColor: colors.background }]}
            selectionColor={colors.primary}
            underlineColor="transparent"
            mode="outlined"
            {...props}
        />
        {description && !errorText ? (
            <Text style={[styles.description, { color: colors.secondary }]}>{description}</Text>
        ) : null}
        {errorText ? <Text style={[styles.error, { color: colors.error }]}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    description: {
        fontSize: 13,
        paddingTop: 8,
    },
    error: {
        fontSize: 13,
        paddingTop: 8,
    },
})