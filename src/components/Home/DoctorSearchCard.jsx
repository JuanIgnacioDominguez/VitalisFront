import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { HeartIcon as HeartOutline } from 'react-native-heroicons/outline'
import { HeartIcon as HeartSolid } from 'react-native-heroicons/solid'
import { useTranslation } from '../../hooks/useTranslation'
import { useTheme } from '../../context/ThemeContext'
import { getSpecialtyTranslation } from '../../utils/translationUtils'

export default function DoctorSearchCard({ doctor, isFavorite, onFavorite, onPress }) {
    const { t } = useTranslation()
    const { darkMode } = useTheme()
    
    return (
        <TouchableOpacity
            className={`${darkMode ? 'bg-primary-dark' : 'bg-[#C6DBDA]'} rounded-2xl flex-row items-center px-4 py-3 mb-4`}
            activeOpacity={0.85}
            onPress={onPress}
        >
            <Image
                source={
                    doctor.imagen
                        ? { uri: `data:image/jpeg;base64,${doctor.imagen}` }
                        : { uri: 'https://ui-avatars.com/api/?name=Doctor' } 
                }
                className={`w-14 h-14 rounded-full mr-3 border-2 ${darkMode ? 'border-primary-dark' : 'border-primary-light'}`}
            />
            <View className="flex-1">
                <Text className={`font-bold text-base ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    {doctor.name}
                </Text>
                <Text className={`text-ms ${darkMode ? 'text-gray-400' : 'text-secondary-light'}`}>
                    {getSpecialtyTranslation(doctor.specialty, t)}
                </Text>
            </View>
            <TouchableOpacity onPress={onFavorite} activeOpacity={0.7}>
                {isFavorite ? (
                    <HeartSolid size={32} color="#F05C5F" />
                ) : (
                    <HeartOutline size={32} color="#F05C5F" />
                )}
            </TouchableOpacity>
        </TouchableOpacity>
    )
}