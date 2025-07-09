import React from 'react'
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native'
import {
    HomeIcon,
    CalendarDaysIcon,
    HeartIcon,
    UserIcon
} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from '../../hooks/useTranslation'

export default function BottomNavbar() {
    const navigation = useNavigation()
    const { t } = useTranslation()
    
    const tabs = [
        { label: t('home'), icon: HomeIcon, route: 'Home' },
        { label: t('appointments'), icon: CalendarDaysIcon, route: 'Appointments' },
        { label: t('favorites'), icon: HeartIcon, route: 'Favorites' },
        { label: t('user'), icon: UserIcon, route: 'User' }
    ]

    return (
        <SafeAreaView>
            <View className="bg-primary-light flex-row justify-between px-2 py-1 h-[56px] border-t border-quaternary-light">
                {tabs.map((tab, idx) => (
                    <TouchableOpacity
                        key={tab.label}
                        className="flex-1 items-center justify-center"
                        activeOpacity={0.7}
                        onPress={() => {
                            if (tab.route) navigation.navigate('MainTabs', { screen: tab.route })
                        }}
                    >
                        <tab.icon size={24} color="#FFFFFF" />
                        <Text className="text-white text-xs mt-1">{tab.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    )
}