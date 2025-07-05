import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { useColors } from '@/hooks/useColors';

import type { StyleProp, ViewStyle } from 'react-native';
import type { ButtonProps as PaperButtonProps } from 'react-native-paper';

type ButtonProps = {
    mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
    style?: StyleProp<ViewStyle>;
} & Omit<PaperButtonProps, 'mode' | 'style'>;

export default function BorderButton({ mode = 'contained', style, ...props }: ButtonProps) {
    const colors = useColors();
    return (
        <PaperButton
            style={[
                styles.button,
                { borderColor: colors.primary },
            ]}
            labelStyle={[styles.text, { color: colors.primary }]}
            mode={mode}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginVertical: 5,
        paddingVertical: 2,
        borderWidth: 2,
        backgroundColor: 'transparent',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
})