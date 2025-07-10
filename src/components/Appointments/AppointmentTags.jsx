import React from 'react'
import { View, Text } from 'react-native'
import { CalendarDaysIcon, ClockIcon } from 'react-native-heroicons/outline'
import { formatDateEs, formatHourEs } from '../../utils/appointments'
import { useTheme } from '../../context/ThemeContext'

export default function AppointmentTags({ date, time }) {
    const { darkMode } = useTheme()
    
    return (
        <View className="flex-row items-center justify-between w-full mt-1 mb-1">
            <View className={`flex-row items-center px-3 py-1 rounded-lg mr-2 ${darkMode ? 'bg-tertiary-dark' : 'bg-quaternary-light'}`}>
                <CalendarDaysIcon size={20} color={darkMode ? "#07919A" : "#006A71"} />
                <Text className={`ml-1 text-xs font-semibold ${darkMode ? 'text-primary-dark' : 'text-primary-light'}`}>{formatDateEs(date)}</Text>
            </View>
            <View className={`flex-row items-center px-3 py-1 rounded-lg ml-2 ${darkMode ? 'bg-tertiary-dark' : 'bg-quaternary-light'}`}>
                <ClockIcon size={20} color={darkMode ? "#07919A" : "#006A71"} />
                <Text className={`ml-1 text-xs font-semibold ${darkMode ? 'text-primary-dark' : 'text-primary-light'}`}>{formatHourEs(time)}</Text>
            </View>
        </View>
    )
}