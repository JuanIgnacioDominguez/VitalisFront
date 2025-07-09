import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useTranslation } from '../../hooks/useTranslation'
import { getSpecialtyTranslation } from '../../utils/translationUtils'

export default function DoctorCard({ name, specialty, image, onPress }) {
    const { t } = useTranslation()
    
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
                    <Text className="text-white text-xs">{getSpecialtyTranslation(specialty, t)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}