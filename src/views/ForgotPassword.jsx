import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { requestPasswordReset } from '../api/auth'
import { Ionicons } from '@expo/vector-icons' 

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('')

    const handleSendCode = async () => {
        if (!email) return Alert.alert('Error', 'Ingresa tu correo electrónico')
        try {
            const res = await requestPasswordReset(email)
            Alert.alert('Éxito', 'Código enviado correctamente')
            navigation.navigate('VerifyCode', { email })
        } catch (e) {
            Alert.alert(
                'Error',
                `No se pudo enviar el código\n${e?.message || ''}\n${e?.code ? 'Código: ' + e.code : ''}`
            )
        }
    }

    return (
        <View className="flex-1 bg-background-light px-6 justify-center">
            <TouchableOpacity
                style={{ position: 'absolute', top: 40, left: 20, zIndex: 10 }}
                onPress={() => navigation.navigate('Login')}
            >
                <Ionicons name="arrow-back" size={28} color="#008080" />
            </TouchableOpacity>

            <View className="items-center mb-8">
                <Image
                    source={require('../../assets/LogoApp.png')}
                    style={{ width: 120, height: 120, marginBottom: 8 }}
                    resizeMode="contain"
                />
                <Text className="text-xl text-secondary-light font-bold mb-2">Recuperar Contraseña</Text>
                <Text className="text-center text-base text-primary-light mb-4">
                    Ingresa tu correo y te enviaremos un código de verificación para restablecer tu contraseña.
                </Text>
            </View>
            <Text className="text-base font-bold text-primary-light mb-1">Correo Electrónico</Text>
            <TextInput
                className="border-2 border-primary-light rounded-lg px-4 py-2 mb-6 text-primary-light bg-background-light"
                placeholder="ejemplo@mail.com"
                placeholderTextColor="#00808099"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity
                className="bg-primary-light rounded-lg py-3"
                onPress={handleSendCode}
            >
                <Text className="text-white text-lg font-bold text-center">Enviar Código</Text>
            </TouchableOpacity>
        </View>
    )
}