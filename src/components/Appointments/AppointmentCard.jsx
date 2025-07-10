import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useTheme } from '../../context/ThemeContext'
import AppointmentTags from './AppointmentTags'

export default function AppointmentCard({ doctor, specialty, date, time, image, onPress }) {
    const { darkMode } = useTheme()
    
    return (
        <View className={`rounded-2xl px-0 py-0 mb-5 shadow-sm ${darkMode ? 'bg-quaternary-dark' : 'bg-[#E6ECEB]'}`}>
            <View className="flex-row items-center px-4 pt-4 pb-2">
                <Image
                    source={{ uri: image }}
                    className={`w-14 h-14 rounded-full mr-3 border-2 ${darkMode ? 'border-primary-dark' : 'border-primary-light'}`}
                />
                <View className="flex-1">
                    <Text 
                        className="font-bold text-base"
                        style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                    >
                        {doctor}
                    </Text>
                    <Text 
                        className="text-xs"
                        style={{ color: darkMode ? '#A0A0A0' : '#666' }}
                    >
                        {specialty}
                    </Text>
                </View>
            </View>
            <View className="px-4">
                <AppointmentTags date={date} time={time} />
            </View>
            <View className="px-4 pb-4 pt-1">
                <TouchableOpacity
                    className={`rounded-lg py-2 ${darkMode ? 'bg-primary-dark' : 'bg-primary-light'}`}
                    onPress={onPress}
                    activeOpacity={0.85}
                >
                    <Text className="text-white text-center text-base font-semibold">Ver Detalles</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}