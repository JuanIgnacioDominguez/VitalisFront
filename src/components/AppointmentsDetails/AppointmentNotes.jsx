import React from 'react'
import { View, Text } from 'react-native'

export default function AppointmentNotes({ notes, darkMode }) {
    return (
        <View className="mb-4">
            <Text 
                className="text-sm font-semibold mb-2"
                style={{ color: darkMode ? '#07919A' : '#006A71' }}
            >
                Notas importantes
            </Text>
            <View 
                className="p-3 rounded-lg"
                style={{ backgroundColor: darkMode ? '#1A1A1A' : '#F5F5F5' }}
            >
                <Text 
                    className="text-sm"
                    style={{ color: darkMode ? '#E6E6E6' : '#666' }}
                >
                    {notes}
                </Text>
            </View>
        </View>
    )
}