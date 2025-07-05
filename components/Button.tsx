import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { useColors } from '@/hooks/useColors'

import type { StyleProp, ViewStyle } from 'react-native';
import type { ButtonProps as PaperButtonProps } from 'react-native-paper';

type ButtonProps = {
    mode?: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal';
    style?: StyleProp<ViewStyle>;
} & Omit<PaperButtonProps, 'mode' | 'style'>;

export default function Button({ mode = 'contained', style, ...props }: ButtonProps) {
    const colors = useColors();
    return (
        <PaperButton
            style={[
                styles.button,
                { backgroundColor: mode === 'outlined' ? colors.background : colors.primary }
            ]}
            labelStyle={styles.text}
            mode={mode}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        lineHeight: 26,
    },
})