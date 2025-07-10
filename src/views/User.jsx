import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import UserHeader from '../components/User/UserHeader'
import UserMenuItem from '../components/User/UserMenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../api/auth' 
import AsyncStorage from '@react-native-async-storage/async-storage'
import LogOut from '../components/PopUps/LogOut'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from '../hooks/useTranslation'

export default function User({ navigation }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const [showModal, setShowModal] = useState(false)
    const { darkMode } = useTheme()
    const { t } = useTranslation()

    const handleLogout = async () => {
        setShowModal(false)
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('token')
        dispatch(logout())
        navigation.navigate('FirstView')
    }

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
                <UserHeader nombre={user?.nombre || 'Usuario'} user={user} darkMode={darkMode} />
                <View className="px-8">
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/user.png"
                    label={t('profile')}
                    onPress={() => navigation.navigate('EditUser')}
                    darkMode={darkMode}
                />
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/star.png"
                    label={t('rating')}
                    onPress={() => navigation.navigate('Rating')}
                    darkMode={darkMode}
                />
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/lock-2.png"
                    label={t('privacyPolicy')}
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                    darkMode={darkMode}
                />
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/settings.png"
                    label={t('settings')}
                    onPress={() => navigation.navigate('Settings')}
                    darkMode={darkMode}
                />
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/help.png"
                    label={t('help')}
                    onPress={() => navigation.navigate('Faq')}
                    darkMode={darkMode}
                />
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/new-post.png"
                    label={t('contactUs')}
                    onPress={() => navigation.navigate('ContactUs')}
                    darkMode={darkMode}
                />
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/logout-rounded-left.png"
                    label={t('logout')}
                    onPress={() => setShowModal(true)}
                    darkMode={darkMode}
                />
                </View>
            </ScrollView>
            <LogOut
                visible={showModal}
                onClose={() => setShowModal(false)}
                onLogout={handleLogout}
                darkMode={darkMode}
            />
        </View>
    )
}