import React from 'react'
import { View, ScrollView } from 'react-native'
import UserHeader from '../components/User/UserHeader'
import UserMenuItem from '../components/User/UserMenuItem'
import BottomNavbar from '../components/BotomNavbar/BottomNavbar'

export default function User({ navigation }) {
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
                onPress={() => navigation.navigate('FirstView')}
            />
            </View>
        </ScrollView>
        <BottomNavbar />
        </View>
    )
}