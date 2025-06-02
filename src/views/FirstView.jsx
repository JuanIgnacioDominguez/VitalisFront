import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

export default function FirstView({ navigation }) {
const dispatch = useDispatch()


return (
    <View className="flex-1 bg-background-light px-6">
        <View className="flex-1 justify-center items-center">
            <Image
                source={require('../../assets/LogoApp.png')}
                className="w-100 h-100 mb-4"
                resizeMode="contain"
            />
            <TouchableOpacity
                className="bg-primary-light rounded-lg w-full py-3 mb-3"
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Login')}
            >
                <Text className="text-white text-lg font-bold text-center">Iniciar Sesion</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="border-2 border-primary-light rounded-lg w-full py-3 mb-3"
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Register')}
            >
                <Text className="text-primary-light font-bold text-center text-lg">Registrate</Text>
            </TouchableOpacity>

            <TouchableOpacity className="border-2 border-primary-light rounded-lg w-full py-3 flex-row items-center justify-center mb-8" activeOpacity={0.8}>
                <Text className="text-primary-light text-lg font-bold">Continuar con Google</Text>
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-between w-full mb-7">
            <Text className="text-base text-primary-light">Problemas? Contáctanos</Text>
            <Text className="text-base text-primary-light">Políticas de Privacidad</Text>
        </View>
    </View>
)
}