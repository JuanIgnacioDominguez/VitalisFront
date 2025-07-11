import React from 'react'
import { View, Text } from 'react-native'

export default function AppointmentInfoBlock({ label, value, darkMode }) {
    return (
        <View className="mb-4">
            <Text 
                className="text-base font-semibold mb-2"
                style={{ color: darkMode ? '#07919A' : '#006A71' }}
            >
                {label}
            </Text>
            <Text 
                className="text-base"
                style={{ color: darkMode ? '#E6E6E6' : '#333' }}
            >
                {value}
            </Text>
        </View>
    )
}