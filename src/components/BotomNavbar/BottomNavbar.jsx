import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import {
    HomeIcon,
    CalendarDaysIcon,
    HeartIcon,
    UserIcon
} from 'react-native-heroicons/outline'

const tabs = [
    { label: 'Menu', icon: HomeIcon },
    { label: 'Turnos', icon: CalendarDaysIcon },
    { label: 'Favoritos', icon: HeartIcon },
    { label: 'Perfil', icon: UserIcon }
]

export default function BottomNavbar() {
    return (
        <View className="absolute bottom-0 left-0 right-0 bg-primary-light flex-row justify-between px-2 py-1 h-[56px] border-t border-quaternary-light">
        {tabs.map((tab, idx) => (
            <TouchableOpacity
            key={tab.label}
            className="flex-1 items-center justify-center"
            activeOpacity={0.7}
            >
            <tab.icon size={24} color="#FFFFFF" />
            <Text className="text-white text-xs mt-1">{tab.label}</Text>
            </TouchableOpacity>
        ))}
        </View>
    )
}