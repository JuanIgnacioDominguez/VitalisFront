import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from '../../hooks/useTranslation'

export default function RegisterHeader({ darkMode }) {
    const navigation = useNavigation()
    const { t } = useTranslation()
    
    return (
        <View className="items-center mt-14">
            <Image
                source={require('../../../assets/LogoApp.png')}
                className="w-100 h-100 mb-4"
                resizeMode="contain"
            />

        </View>
    )
}