import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

export default function DoctorCard({ name, specialty, image, onPress }) {
    return (
        <TouchableOpacity
            className="w-[48%] mb-3"
            activeOpacity={0.85}
            onPress={onPress}
        >
            <View className="bg-white rounded-xl overflow-hidden shadow-sm">
                <Image source={{ uri: image }} className="w-full h-24" resizeMode="cover" />
                <View className="p-2 bg-primary-light rounded-b-xl">
                    <Text className="text-white font-semibold text-base">{name}</Text>
                    <Text className="text-white text-xs">{specialty}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}