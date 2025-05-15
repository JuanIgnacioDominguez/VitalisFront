import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'

export default function FirstView({ navigation }) {
const dispatch = useDispatch()


return (
    <View className="flex-1 bg-background-light px-6">
        <View className="flex-1 justify-center items-center">
            <Image
                source={require('../../assets/icon.png')}
                className="w-40 h-40 mb-4"
                resizeMode="contain"
            />
            <Text className="text-4xl font-bold text-primary-light mb-2">Vitalis</Text>
            <Text className="text-xl text-text-light mb-8 text-center">Clínica de Salud Vitalis</Text>

            <TouchableOpacity
                className="bg-primary-light rounded-lg w-full py-3 mb-3"
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Login')}
            >
                <Text className="text-white text-base font-bold text-center">Iniciar Sesion</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="border-2 border-primary-light rounded-lg w-full py-3 mb-3"
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Register')}
            >
                <Text className="text-primary-light text-base font-bold text-center">Registrate</Text>
            </TouchableOpacity>

            <TouchableOpacity className="border-2 border-primary-light rounded-lg w-full py-3 flex-row items-center justify-center mb-8" activeOpacity={0.8}>
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
                    className="w-6 h-6 mr-2"
                />
                <Text className="text-primary-light text-base font-bold">Continuar con Google</Text>
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-between w-full mb-4">
            <Text className="text-xs text-primary-light">Problemas? Contáctanos</Text>
            <Text className="text-xs text-primary-light">Políticas de Privacidad</Text>
        </View>
    </View>
)
}