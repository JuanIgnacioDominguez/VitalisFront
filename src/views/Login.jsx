import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'

export default function LoginView({ navigation }) {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [showPassword, setShowPassword] = useState(false)

return (
    <View className="flex-1 bg-background-light px-6">
        <View className="items-center mt-10 mb-6">
        <Image
            source={require('../../assets/LogoApp.png')}
            className="w-100 h-70 mt-5"
            resizeMode="contain"
        />
        </View>

        <Text className="text-base font-bold text-primary-light mb-1">Email:</Text>
        <View className="flex-row items-center border-2 border-primary-light rounded-lg px-3 mb-4">
        <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/008080/new-post.png' }}
            className="w-5 h-5 mr-2"
        />
        <TextInput
            className="flex-1 py-2 text-primary-light"
            placeholder="ejemplo@mail.com"
            placeholderTextColor="#00808099"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        </View>

        <Text className="text-base font-bold text-primary-light mb-1">Contraseña:</Text>
        <View className="flex-row items-center border-2 border-primary-light rounded-lg px-3 mb-1">
        <Image
            source={{ uri: 'https://img.icons8.com/ios-filled/50/008080/lock-2.png' }}
            className="w-5 h-5 mr-2"
        />
        <TextInput
            className="flex-1 py-2 text-primary-light"
            placeholder="Contraseña"
            placeholderTextColor="#00808099"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
            source={{
                uri: showPassword
                ? 'https://img.icons8.com/ios-filled/50/008080/visible--v1.png'
                : 'https://img.icons8.com/ios-filled/50/008080/invisible.png'
            }}
            className="w-5 h-5 ml-2"
            />
        </TouchableOpacity>
        </View>

        <TouchableOpacity className="mb-6 mt-1">
        <Text className="text-lg text-primary-light text-right">Olvidé mi Contraseña</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-primary-light rounded-lg w-full py-3 mb-3" activeOpacity={0.8} onPress={() => navigation.navigate('Home')}>
            <Text className="text-white font-bold text-center text-lg">Iniciar Sesion</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-2">
        <Text className="text-lg text-primary-light">No tienes Cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-lg text-primary-light font-bold underline">Registrate</Text>
        </TouchableOpacity>
        </View>
    </View>
    )
}