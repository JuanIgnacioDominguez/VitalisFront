import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { verifyResetCode } from '../api/auth'
import CustomPopup from '../components/PopUps/CustomPopup'

export default function VerifyCode({ navigation, route }) {
    const { email } = route.params
    const [code, setCode] = useState('')
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)

    const handleVerify = async () => {
        if (code.length !== 6) {
            setShowErrorPopup(true)
            return
        }
        try {
            await verifyResetCode(email, code)
            setShowSuccessPopup(true)
        } catch (e) {
            setShowErrorPopup(true)
        }
    }

    return (
        <View className="flex-1 bg-background-light px-6 justify-center">
        <View className="items-center mb-8">
            <Image
            source={require('../../assets/LogoApp.png')}
            style={{ width: 120, height: 120, marginBottom: 8 }}
            resizeMode="contain"
            />
            <Text className="text-xl text-secondary-light font-bold mb-2">Verificar Código</Text>
            <Text className="text-center text-base text-primary-light mb-4">
            Ingresa el código de 4 dígitos que enviamos a tu correo
            </Text>
        </View>
        <TextInput
            className="border-2 border-primary-light rounded-lg px-4 py-2 mb-6 text-primary-light text-center text-2xl tracking-widest bg-background-light"
            placeholder="____"
            placeholderTextColor="#00808099"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
        />
        <TouchableOpacity
            className="bg-primary-light rounded-lg py-3 mb-3"
            onPress={handleVerify}
        >
            <Text className="text-white text-lg font-bold text-center">Confirmar Código</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {/* reenviar código */}}>
            <Text className="text-primary-light text-center underline">Reenviar Código</Text>
        </TouchableOpacity>
        <CustomPopup
            visible={showErrorPopup}
            onClose={() => setShowErrorPopup(false)}
            title="Código incorrecto"
            message="El código ingresado es incorrecto o expiró. Intenta nuevamente."
            color="#F76C6C"
            borderColor="#F76C6C"
            buttonText="Volver"
        />
        <CustomPopup
            visible={showSuccessPopup}
            onClose={() => {
                setShowSuccessPopup(false)
                navigation.navigate('ResetPassword', { email, code })
            }}
            title="¡Código correcto!"
            message="El código fue verificado correctamente. Ahora puedes cambiar tu contraseña."
            color="#008080"
            borderColor="#7AD7F0"
            buttonText="Continuar"
        />
        </View>
    )
}