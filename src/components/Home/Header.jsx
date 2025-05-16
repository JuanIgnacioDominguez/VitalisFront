import React from 'react'
import { View, Text, Image } from 'react-native'

export default function Header() {
    return (
        <View className="flex-row items-center mb-4 mt-10">
        <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            className="w-12 h-12 rounded-full mr-3 border-2 border-primary-light"
        />
        <View>
            <Text className="text-primary-light font-semibold text-base leading-5">Bienvenido de Vuelta!</Text>
            <Text className="text-text-light text-sm">Luigi Adduci</Text>
        </View>
        </View>
    )
}