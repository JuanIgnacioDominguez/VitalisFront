import React from 'react'
import { View, Text } from 'react-native'
import { CalendarDaysIcon, ClockIcon } from 'react-native-heroicons/outline'
import { formatDateEs, formatHourEs } from '../../utils/appointments'

export default function AppointmentTags({ date, time }) {
    return (
        <View className="flex-row items-center justify-between w-full mt-1 mb-1">
            <View className="flex-row items-center bg-quaternary-light px-3 py-1 rounded-lg mr-2">
                <CalendarDaysIcon size={20} color="#006A71" />
                <Text className="ml-1 text-xs text-primary-light font-semibold">{formatDateEs(date)}</Text>
            </View>
            <View className="flex-row items-center bg-quaternary-light px-3 py-1 rounded-lg ml-2">
                <ClockIcon size={20} color="#006A71" />
                <Text className="ml-1 text-xs text-primary-light font-semibold">{formatHourEs(time)}</Text>
            </View>
        </View>
    )
}