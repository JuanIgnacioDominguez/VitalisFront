import React from 'react'
import { View, Text, TextInput } from 'react-native'

export default function EditUserInput({ label, value, onChangeText, placeholder, keyboardType }) {
    return (
        <View className="mb-4">
            <Text className="text-primary-light font-bold mb-1">{label}</Text>
            <TextInput
                className="border-2 border-primary-light rounded-lg px-4 py-2 text-primary-light bg-background-light"
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#00808099"
                keyboardType={keyboardType}
            />
        </View>
    )
}