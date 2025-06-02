import React from 'react'
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'

export default function RegisterInput({
    label,
    icon,
    placeholder,
    value,
    onChangeText,
    keyboardType,
    secureTextEntry,
    showPassword,
    setShowPassword,
    isPassword
    }) {
    return (
        <>
        <Text className="text-base font-bold text-primary-light mb-1">{label}</Text>
        <View className="flex-row items-center border-2 border-primary-light rounded-lg px-3 mb-4">
            <Image source={{ uri: icon }} className="w-5 h-5 mr-2" />
            <TextInput
            className="flex-1 py-2 text-primary-light"
            placeholder={placeholder}
            placeholderTextColor="#00808099"
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            />
            {isPassword && (
            <TouchableOpacity onPress={() => setShowPassword && setShowPassword(!showPassword)}>
                <Image
                source={{
                    uri: showPassword
                    ? 'https://img.icons8.com/ios-filled/50/008080/visible--v1.png'
                    : 'https://img.icons8.com/ios-filled/50/008080/invisible.png'
                }}
                className="w-5 h-5 ml-2"
                />
            </TouchableOpacity>
            )}
        </View>
        </>
    )
}