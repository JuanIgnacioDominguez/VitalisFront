import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { CalendarDaysIcon, ClockIcon } from 'react-native-heroicons/outline'

export default function AppointmentCard({ doctor, specialty, date, time, image, onPress }) {
    return (
        <View className="bg-[#E6ECEB] rounded-2xl px-0 py-0 mb-5 shadow-sm">
            <View className="flex-row items-center px-4 pt-4 pb-2">
                <Image
                    source={{ uri: image }}
                    className="w-14 h-14 rounded-full mr-3 border-2 border-primary-light"
                />
                <View className="flex-1">
                    <Text className="text-primary-light font-bold text-base">{doctor}</Text>
                    <Text className="text-secondary-light text-xs">{specialty}</Text>
                </View>
            </View>
            <View className="flex-row items-center px-4 pb-2">
                <View className="flex-row items-center bg-quaternary-light rounded-full px-2 py-1 mr-3">
                    <CalendarDaysIcon size={16} color="#006A71" />
                    <Text className="ml-1 text-xs text-primary-light">{date}</Text>
                </View>
                <View className="flex-row items-center bg-quaternary-light rounded-full px-2 py-1">
                    <ClockIcon size={16} color="#006A71" />
                    <Text className="ml-1 text-xs text-primary-light">{time}</Text>
                </View>
            </View>
            <View className="px-4 pb-4 pt-1">
                <TouchableOpacity
                    className="bg-primary-light rounded-lg py-2"
                    onPress={onPress}
                    activeOpacity={0.85}
                >
                    <Text className="text-white text-center text-base font-semibold">Ver Detalles</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}