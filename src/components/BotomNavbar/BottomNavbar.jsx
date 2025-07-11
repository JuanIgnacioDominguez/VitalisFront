import React from 'react'
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native'
import {
    HomeIcon,
    CalendarDaysIcon,
    HeartIcon,
    UserIcon
} from 'react-native-heroicons/outline'
import {
    HomeIcon as HomeIconSolid,
    CalendarDaysIcon as CalendarDaysIconSolid,
    HeartIcon as HeartIconSolid,
    UserIcon as UserIconSolid
} from 'react-native-heroicons/solid'
import { useNavigation, useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { useTranslation } from '../../hooks/useTranslation'
import { useTheme } from '../../context/ThemeContext'

export default function BottomNavbar() {
    const navigation = useNavigation()
    const route = useRoute()
    const { t } = useTranslation()
    const { darkMode } = useTheme()
    
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home'
    
    const tabs = [
        { 
            label: t('home'), 
            icon: HomeIcon, 
            iconSolid: HomeIconSolid,
            route: 'Home' 
        },
        { 
            label: t('appointments'), 
            icon: CalendarDaysIcon, 
            iconSolid: CalendarDaysIconSolid,
            route: 'Appointments' 
        },
        { 
            label: t('favorites'), 
            icon: HeartIcon, 
            iconSolid: HeartIconSolid,
            route: 'Favorites' 
        },
        { 
            label: t('user'), 
            icon: UserIcon, 
            iconSolid: UserIconSolid,
            route: 'User' 
        }
    ]

    const isActiveTab = (tabRoute) => {
        return routeName === tabRoute
    }

    return (
        <SafeAreaView>
            <View className={`flex-row justify-between px-2 py-1 h-[56px] ${darkMode ? 'bg-primary-dark' : 'bg-primary-light'}`}>
                {tabs.map((tab, idx) => {
                    const isActive = isActiveTab(tab.route)
                    const IconComponent = isActive ? tab.iconSolid : tab.icon
                    
                    return (
                        <TouchableOpacity
                            key={tab.label}
                            className="flex-1 items-center justify-center"
                            activeOpacity={0.7}
                            onPress={() => {
                                if (tab.route) navigation.navigate('MainTabs', { screen: tab.route })
                            }}
                        >
                            <IconComponent 
                                size={24} 
                                color={isActive 
                                    ? (darkMode ? "#FFFFFF" : "#FFFFFF") 
                                    : "#1D1D1D"
                                } 
                            />
                            <Text 
                                className={`text-xs mt-1 ${
                                    isActive 
                                        ? (darkMode ? 'text-default-light' : 'text-default-light') 
                                        : 'text-background-dark'
                                }`}
                            >
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </SafeAreaView>
    )
}