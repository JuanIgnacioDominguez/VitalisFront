import React from 'react'
import { View, Text, Image } from 'react-native'

export default function ProfessionalHeader({ professional, darkMode }) {
    return (
        <View className="items-center mb-0 mt-4">
            <Image
                source={
                    professional.imagen
                        ? { uri: `data:image/jpeg;base64,${professional.imagen}` }
                        : { uri: 'https://ui-avatars.com/api/?name=Doctor' }
                }
                className="w-20 h-20 rounded-full mb-1"
            />
            <Text 
                className="text-lg font-bold"
                style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
            >
                {professional.name}
            </Text>
            <Text 
                className="text-sm"
                style={{ color: darkMode ? '#A0A0A0' : '#666' }}
            >
                {professional.specialty}
            </Text>
        </View>
    )
}