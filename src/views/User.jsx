import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import BottomNavbar from '../components/BotomNavbar/BottomNavbar'

export default function User({ navigation }) {
    return (
        <View className="flex-1 bg-background-light">
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
            <View className="items-center mt-10 mb-6">
            <Text className="text-3xl font-bold text-primary-light mb-4">Perfil</Text>
            <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
                className="w-24 h-24 rounded-full mb-2"
            />
            <Text className="text-lg font-bold text-center mb-6">Luigi Aducci</Text>
            </View>

            <View className="px-8">
            <MenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/user.png"
                label="Perfil"
                onPress={() => {}}
            />
            <MenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/star.png"
                label="Calificación"
                onPress={() => {}}
            />
            <MenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/lock-2.png"
                label="Políticas De Privacidad"
                onPress={() => {}}
            />
            <MenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/settings.png"
                label="Ajustes"
                onPress={() => {}}
            />
            <MenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/help.png"
                label="Ayuda"
                onPress={() => {}}
            />
            <MenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/new-post.png"
                label="Contactanos"
                onPress={() => {}}
            />
            <MenuItem
                icon="https://img.icons8.com/ios-filled/50/008080/logout-rounded-left.png"
                label="Cerrar Sesión"
                onPress={() => navigation.navigate('Login')}
            />
            </View>
        </ScrollView>
        <BottomNavbar />
        </View>
    )
}

function MenuItem({ icon, label, onPress }) {
    return (
        <TouchableOpacity
            className="flex-row items-center justify-between py-3"
            onPress={onPress}
            activeOpacity={0.7}
            >
            <View className="flex-row items-center">
                <View className="bg-primary-light/10 rounded-full p-2 mr-4">
                <Image source={{ uri: icon }} className="w-7 h-7" />
                </View>
                <Text className="text-base text-primary-light">{label}</Text>
            </View>
            <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/24/008080/chevron-right.png' }}
                className="w-5 h-5"
            />
        </TouchableOpacity>
    )
}