import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useTranslation } from '../../hooks/useTranslation'

export default function HeaderSection({ navigation, darkMode }) {
    const { t } = useTranslation()
    
    return (
        <View className="flex-row items-center px-6 mt-12">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
            </TouchableOpacity>
            <Text 
                className="text-2xl font-bold flex-1 text-center mr-8"
                style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
            >
                {t('scheduleAppointment')}
            </Text>
        </View>
    )
}