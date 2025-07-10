import React from 'react'
import { View, Text, Image } from 'react-native'
import { useSelector } from 'react-redux'
import { useTranslation } from '../../hooks/useTranslation'

export default function Header({ darkMode }) {
    const user = useSelector(state => state.auth.user)
    const { t } = useTranslation()

    return (
        <View className="flex-row items-center mb-4 mt-10">
            <Image
                source={{
                    uri: user?.foto || user?.imagen 
                        ? `data:image/jpeg;base64,${user.foto || user.imagen}`
                        : 'https://randomuser.me/api/portraits/men/1.jpg'
                }}
                className={`w-12 h-12 rounded-full mr-3 border-2 ${darkMode ? 'border-primary-dark' : 'border-primary-light'}`}
            />
            <View>
                <Text className={`font-semibold text-base leading-5 ${darkMode ? 'text-primary-dark' : 'text-primary-light'}`}>{t('welcomeMessage')}</Text>
                <Text className={`text-sm ${darkMode ? 'text-text-dark' : 'text-text-light'}`}>{user?.nombre || t('user')}</Text>
            </View>
        </View>
    )
}