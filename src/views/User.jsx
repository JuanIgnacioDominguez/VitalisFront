import React from 'react'
import { View, ScrollView } from 'react-native'
import UserHeader from '../components/User/UserHeader'
import UserMenuItem from '../components/User/UserMenuItem'
import BottomNavbar from '../components/BotomNavbar/BottomNavbar'
import { useDispatch } from 'react-redux'
import { logout } from '../Api/auth' 
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function User({ navigation }) {
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('token')
        dispatch(logout())
        navigation.navigate('FirstView')
    }

    return (
        <View className="flex-1 bg-background-light">
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
            <UserHeader />
            <View className="px-8">
            <UserMenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/user.png"
                label="Perfil"
                onPress={() => {}}
            />
            <UserMenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/star.png"
                label="Calificación"
                onPress={() => {}}
            />
            <UserMenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/lock-2.png"
                label="Políticas De Privacidad"
                onPress={() => {}}
            />
            <UserMenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/settings.png"
                label="Ajustes"
                onPress={() => {}}
            />
            <UserMenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/help.png"
                label="Ayuda"
                onPress={() => {}}
            />
            <UserMenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/new-post.png"
                label="Contactanos"
                onPress={() => {}}
            />
            <UserMenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/logout-rounded-left.png"
                label="Cerrar Sesión"
                onPress={handleLogout}
            />
            </View>
        </ScrollView>
        <BottomNavbar />
        </View>
    )
}