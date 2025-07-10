import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '../../context/ThemeContext'

export default function ErrorMessage({ error }) {
    const { darkMode } = useTheme()
    
    return (
        <View className="flex-1 justify-center items-center px-6">
            <Text 
                className="text-center text-lg"
                style={{ color: darkMode ? '#E6E6E6' : '#F76C6C' }}
            >
                Error: {error}
            </Text>
        </View>
    )
}