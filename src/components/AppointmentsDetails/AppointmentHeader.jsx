import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'

export default function AppointmentHeader({ onBack, title, darkMode }) {
    return (
        <View className="flex-row items-center px-6 pt-10 pb-2">
            <TouchableOpacity onPress={onBack}>
                <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
            </TouchableOpacity>
            <Text 
                className="text-2xl font-bold flex-1 text-center mr-8"
                style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
            >
                {title}
            </Text>
        </View>
    )
}