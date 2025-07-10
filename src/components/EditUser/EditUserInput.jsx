import React from 'react'
import { View, Text, TextInput } from 'react-native'

export default function EditUserInput({ label, value, onChangeText, placeholder, keyboardType, darkMode }) {
    return (
        <View className="mb-4">
            <Text className={`font-bold mb-1 ${darkMode ? 'text-primary-dark' : 'text-primary-light'}`}>{label}</Text>
            <TextInput
                className={`border-2 rounded-lg px-4 py-2 ${
                    darkMode 
                        ? 'border-primary-dark bg-components-dark text-text-dark' 
                        : 'border-primary-light bg-background-light text-primary-light'
                }`}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={darkMode ? "#07919A99" : "#00808099"}
                keyboardType={keyboardType}
            />
        </View>
    )
}