import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { useColors } from '@/hooks/useColors'

export default function Header(props: any) {
    const colors = useColors();
    return <Text style={[ styles.header, { color: colors.primary } ]} {...props} />
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
})