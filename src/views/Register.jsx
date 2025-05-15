import React, { useState } from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'

export default function Register({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className="flex-1 bg-background-light px-6">
            <View className="items-center mt-10 mb-6">
            <Image
                source={require('../../assets/icon.png')}
                className="w-40 h-40 mb-4"
                resizeMode="contain"
            />
            <Text className="text-4xl font-bold text-primary-light mb-2">Vitalis</Text>
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
            <View className="flex-row items-center border-2 border-primary-light rounded-lg px-3 mb-4">
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

            <Text className="text-base font-bold text-primary-light mb-1">Nombre Completo:</Text>
            <View className="flex-row items-center border-2 border-primary-light rounded-lg px-3 mb-4">
            <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/008080/user.png' }}
                className="w-5 h-5 mr-2"
            />
            <TextInput
                className="flex-1 py-2 text-primary-light"
                placeholder="Nombre Completo"
                placeholderTextColor="#00808099"
                value={fullName}
                onChangeText={setFullName}
            />
            </View>

            <Text className="text-base font-bold text-primary-light mb-1">Telefono:</Text>
            <View className="flex-row items-center border-2 border-primary-light rounded-lg px-3 mb-6">
            <Image
                source={{ uri: 'https://img.icons8.com/ios-filled/50/008080/phone.png' }}
                className="w-5 h-5 mr-2"
            />
            <TextInput
                className="flex-1 py-2 text-primary-light"
                placeholder="1121571748"
                placeholderTextColor="#00808099"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            </View>

            <TouchableOpacity className="bg-primary-light rounded-lg w-full py-3 mb-3" activeOpacity={0.8}>
            <Text className="text-white text-base font-bold text-center">Crear Cuenta</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-2">
            <Text className="text-xs text-primary-light">Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text className="text-xs text-primary-light font-bold underline">Inicia Sesión</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}