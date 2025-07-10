import React from 'react'
import { View, Image, Text } from 'react-native'
import { useTranslation } from '../../hooks/useTranslation'

export default function UserHeader({ nombre, user, darkMode }) {
    const { t } = useTranslation()
    
    return (
        <View className="items-center mt-10 mb-6">
            <Text className={`text-3xl font-bold mb-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                {t('profile')}
            </Text>
            <Image
                source={{
                    uri: user?.foto || user?.imagen 
                        ? `data:image/jpeg;base64,${user.foto || user.imagen}`
                        : 'https://randomuser.me/api/portraits/men/1.jpg'
                }}
                className={`w-24 h-24 rounded-full mb-2 border-2 ${darkMode ? 'border-primary-dark' : 'border-primary-light'}`}
            />
            <Text className={`text-lg font-bold text-center mb-6 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                {nombre}
            </Text>
        </View>
    )
}