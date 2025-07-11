import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../context/ThemeContext'

export default function FirstView({ navigation }) {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const { darkMode } = useTheme()

    return (
        <View className={`flex-1 px-6 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <View className="flex-1 justify-center items-center">
                <Image
                    source={require('../../assets/LogoApp.png')}
                    className="w-100 h-100 mb-10"
                    resizeMode="contain"
                />
                <TouchableOpacity
                    className={`rounded-lg w-full py-3 mb-3 ${darkMode ? 'bg-primary-dark' : 'bg-primary-light'}`}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text className="text-white text-lg font-bold text-center">{t('loginBtn')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`border-2 rounded-lg w-full py-3 mb-8 ${darkMode ? 'border-primary-dark' : 'border-primary-light'}`}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text className={`font-bold text-center text-lg ${darkMode ? 'text-primary-dark' : 'text-primary-light'}`}>{t('registerBtn')}</Text>
                </TouchableOpacity>
            </View>
            <View className="flex-row justify-between w-full mb-7">
                <Text className={`text-base ${darkMode ? 'text-secondary-dark' : 'text-primary-light'}`}>{t('problems')}</Text>
                <Text className={`text-base ${darkMode ? 'text-secondary-dark' : 'text-primary-light'}`}>{t('privacyPolicies')}</Text>
            </View>
        </View>
    )
}