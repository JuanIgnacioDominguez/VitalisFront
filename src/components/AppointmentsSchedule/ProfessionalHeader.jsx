import React from 'react'
import { View, Text, Image } from 'react-native'

export default function ProfessionalHeader({ professional, darkMode }) {
    return (
        <View className="items-center mt-4 mb-2">
            <Image
                source={
                    professional.imagen
                        ? { uri: `data:image/jpeg;base64,${professional.imagen}` }
                        : { uri: 'https://ui-avatars.com/api/?name=Doctor' }
                }
                className="w-24 h-24 rounded-full mb-2"
            />
            <Text className={`text-xl font-bold ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>{professional.name}</Text>
            <Text className={`text-base ${darkMode ? 'text-secondary-dark' : 'text-secondary-light'}`}>{professional.specialty}</Text>
        </View>
    )
}