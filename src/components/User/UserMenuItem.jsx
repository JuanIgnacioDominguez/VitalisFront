import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

export default function UserMenuItem({ icon, label, onPress }) {
    return (
        <TouchableOpacity
        className="flex-row items-center justify-between py-3"
        onPress={onPress}
        activeOpacity={0.7}
        >
        <View className="flex-row items-center">
            <View className="bg-primary-light/10 rounded-full p-2 mr-4">
            <Image source={{ uri: icon }} className="w-7 h-7" />
            </View>
            <Text className="text-base text-primary-light">{label}</Text>
        </View>
        <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/24/008080/chevron-right.png' }}
            className="w-5 h-5"
        />
        </TouchableOpacity>
    )
}