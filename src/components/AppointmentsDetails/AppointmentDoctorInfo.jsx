import React from 'react'
import { View, Text, Image } from 'react-native'

export default function AppointmentDoctorInfo({ doctorName, specialty, professionalId, image }) {
    return (
        <View className="flex-row items-center mb-4">
            <Image
                source={image ? { uri: image } : { uri: 'https://ui-avatars.com/api/?name=Doctor' }}
                className="w-16 h-16 rounded-full mr-4 border-2 border-primary-light"
            />
            <View>
                <Text className="text-xl font-bold text-primary-light">{doctorName}</Text>
                <Text className="text-base text-secondary-light">{specialty}</Text>
                <Text className="text-base text-secondary-light">MP {professionalId}</Text>
            </View>
        </View>
    )
}