import React from 'react'
import { View, Image, Text } from 'react-native'

export default function RegisterHeader() {
    return (
        <View className="items-center mt-10 mb-6">
        <Image
            source={require('assets/LogoApp.png')}
            className="w-100 h-100 mb-4"
            resizeMode="contain"
        />
        </View>
    )
}