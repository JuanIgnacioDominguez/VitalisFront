import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useTranslation } from '../../hooks/useTranslation'
import { useTheme } from '../../context/ThemeContext'
import { getSpecialtyTranslation } from '../../utils/translationUtils'

export default function DoctorCard({ name, specialty, image, onPress }) {
    const { t } = useTranslation()
    const { darkMode } = useTheme()
    
    return (
        <TouchableOpacity
            className="w-[48%] mb-3"
            activeOpacity={0.85}
            onPress={onPress}
        >
            <View className={`${darkMode ? 'bg-components-dark' : 'bg-white'} rounded-xl overflow-hidden shadow-sm`}>
                <Image source={{ uri: image }} className="w-full h-24" resizeMode="cover" />
                <View className={`p-2 rounded-b-xl ${darkMode ? 'bg-primary-dark' : 'bg-primary-light'}`}>
                    <Text className={`font-semibold text-base ${darkMode ? 'text-text-dark' : 'text-white'}`}>{name}</Text>
                    <Text className={`text-sm ${darkMode ? 'text-text-dark' : 'text-white'}`}>{getSpecialtyTranslation(specialty, t)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}