import React from 'react'
import { View, Image, Text } from 'react-native'

export default function UserHeader() {
    return (
        <View className="items-center mt-10 mb-6">
        <Text className="text-3xl font-bold text-primary-light mb-4">Perfil</Text>
        <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            className="w-24 h-24 rounded-full mb-2"
        />
        <Text className="text-lg font-bold text-center mb-6">Luigi Aducci</Text>
        </View>
    )
}