import React from 'react'
import { View, Text, Image } from 'react-native'

export default function AppointmentDoctorInfo({ doctorName, specialty, professionalId, image, darkMode }) {
    return (
        <View className="items-center mb-6">
            <Image
                source={{ uri: image || 'https://ui-avatars.com/api/?name=Doctor' }}
                className={`w-20 h-20 rounded-full mb-3 border-2 ${darkMode ? 'border-primary-dark' : 'border-primary-light'}`}
            />
            <Text 
                className="text-xl font-bold text-center mb-1"
                style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
            >
                {doctorName}
            </Text>
            <Text 
                className="text-sm text-center mb-1"
                style={{ color: darkMode ? '#A0A0A0' : '#666' }}
            >
                {specialty}
            </Text>
            <Text 
                className="text-xs text-center"
                style={{ color: darkMode ? '#A0A0A0' : '#666' }}
            >
                Matrícula: {professionalId || 'N/A'}
            </Text>
        </View>
    )
}