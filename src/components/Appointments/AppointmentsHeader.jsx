import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTranslation } from '../../hooks/useTranslation'

export default function AppointmentsHeader({ tab, setTab, darkMode }) {
    const { t } = useTranslation()
    
    return (
        <View className="pt-12 pb-4 px-6">
            <Text className={`text-2xl font-bold text-center mb-7 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>{t('appointmentView')}</Text>
            <View className="flex-row justify-center mb-7">
                <TouchableOpacity
                    className={`flex-1 mr-2 py-2 rounded-full border-2 ${tab === t('pending') ? (darkMode ? 'bg-primary-dark border-primary-dark' : 'bg-primary-light border-primary-light') : (darkMode ? 'border-primary-dark bg-transparent' : 'border-primary-light bg-transparent')}`}
                    onPress={() => setTab(t('pending'))}
                    activeOpacity={0.8}
                >
                    <Text className={`text-base font-semibold text-center ${tab === t('pending') ? 'text-white' : (darkMode ? 'text-primary-dark' : 'text-primary-light')}`}>{t('pending')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 py-2 rounded-full border-2 ${tab === t('completed') ? (darkMode ? 'bg-primary-dark border-primary-dark' : 'bg-primary-light border-primary-light') : (darkMode ? 'border-primary-dark bg-transparent' : 'border-primary-light bg-transparent')}`}
                    onPress={() => setTab(t('completed'))}
                    activeOpacity={0.8}
                >
                    <Text className={`text-base font-semibold text-center ${tab === t('completed') ? 'text-white' : (darkMode ? 'text-primary-dark' : 'text-primary-light')}`}>{t('completed')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}