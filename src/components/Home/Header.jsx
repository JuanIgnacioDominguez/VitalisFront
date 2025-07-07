import React from 'react'
import { View, Text, Image } from 'react-native'
import { useSelector } from 'react-redux'

export default function Header() {
    const user = useSelector(state => state.auth.user)

    return (
        <View className="flex-row items-center mb-4 mt-10">
            <Image
                source={{
                    uri: user?.foto || user?.imagen 
                        ? `data:image/jpeg;base64,${user.foto || user.imagen}`
                        : 'https://randomuser.me/api/portraits/men/1.jpg'
                }}
                className="w-12 h-12 rounded-full mr-3 border-2 border-primary-light"
            />
            <View>
                <Text className="text-primary-light font-semibold text-base leading-5">Bienvenido de Vuelta!</Text>
                <Text className="text-text-light text-sm">{user?.nombre || 'Usuario'}</Text>
            </View>
        </View>
    )
}