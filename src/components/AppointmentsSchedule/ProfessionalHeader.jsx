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
            <Text className={`text-lg font-bold ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>{professional.name}</Text>
            <Text className={`text-sm ${darkMode ? 'text-secondary-dark' : 'text-secondary-light'}`}>{professional.specialty}</Text>
        </View>
    )
}