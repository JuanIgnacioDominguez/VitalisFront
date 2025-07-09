import React from 'react'
import { View, Image, Text } from 'react-native'
import { useTranslation } from '../../hooks/useTranslation'

export default function UserHeader({ nombre, user }) {
    const { t } = useTranslation()
    
    return (
        <View className="items-center mt-10 mb-6">
            <Text className="text-3xl font-bold text-primary-light mb-4">{t('profile')}</Text>
            <Image
                source={{
                    uri: user?.foto || user?.imagen 
                        ? `data:image/jpeg;base64,${user.foto || user.imagen}`
                        : 'https://randomuser.me/api/portraits/men/1.jpg'
                }}
                className="w-24 h-24 rounded-full mb-2"
            />
            <Text className="text-lg font-bold text-center mb-6">{nombre}</Text>
        </View>
    )
}