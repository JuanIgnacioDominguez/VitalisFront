import React, { useState } from 'react'
import { View, ScrollView } from 'react-native'
import UserHeader from '../components/User/UserHeader'
import UserMenuItem from '../components/User/UserMenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../api/auth' 
import AsyncStorage from '@react-native-async-storage/async-storage'
import LogOut from '../components/PopUps/LogOut'
import { useTheme } from '../context/ThemeContext'

export default function User({ navigation }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const [showModal, setShowModal] = useState(false)
    const { darkMode } = useTheme()

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
                <UserHeader nombre={user?.nombre || 'Usuario'} />
                <View className="px-8">
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/user.png"
                    label="Perfil"
                    onPress={() => navigation.navigate('EditUser')}
                />
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/star.png"
                    label="Calificación"
                    onPress={() => navigation.navigate('Rating')}
                />
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/lock-2.png"
                    label="Políticas De Privacidad"
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                />
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/settings.png"
                    label="Ajustes"
                    onPress={() => navigation.navigate('Settings')}
                />
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/help.png"
                    label="Ayuda"
                    onPress={() => navigation.navigate('Faq')}
                />
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/new-post.png"
                    label="Contactanos"
                    onPress={() => navigation.navigate('ContactUs')}
                />
                <UserMenuItem
                    icon="https://img.icons8.com/ios-filled/50/008080/logout-rounded-left.png"
                    label="Cerrar Sesión"
                    onPress={() => setShowModal(true)}
                />
                </View>
            </ScrollView>
            <LogOut
                visible={showModal}
                onClose={() => setShowModal(false)}
                onLogout={handleLogout}
            />
        </View>
    )
}