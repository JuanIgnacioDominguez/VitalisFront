import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { HeartIcon as HeartOutline } from 'react-native-heroicons/outline'
import { HeartIcon as HeartSolid } from 'react-native-heroicons/solid'

export default function DoctorSearchCard({ doctor, isFavorite, onFavorite, onPress }) {
    return (
        <TouchableOpacity
        className="bg-[#C6DBDA] rounded-2xl flex-row items-center px-4 py-3 mb-4"
        activeOpacity={0.85}
        onPress={onPress}
        >
        <Image
            source={
            doctor.imagen
                ? { uri: `data:image/jpeg;base64,${doctor.imagen}` }
                : { uri: 'https://ui-avatars.com/api/?name=Doctor' } // fallback genérico
            }
            className="w-14 h-14 rounded-full mr-3 border-2 border-primary-light"
        />
        <View className="flex-1">
            <Text className="text-primary-light font-bold text-base">{doctor.name}</Text>
            <Text className="text-secondary-light text-xs">{doctor.specialty}</Text>
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