import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useTranslation } from '../../hooks/useTranslation'
import { useNavigation } from '@react-navigation/native'

export default function LoginHeader({ darkMode }) {
    const { t } = useTranslation()
    const navigation = useNavigation()
    
    return (
        <View className="items-center mt-14 mb-6">
            <Image
                source={require('../../../assets/LogoApp.png')}
                className="w-100 h-100 mb-4"
                resizeMode="contain"
            />
        </View>
    )
}