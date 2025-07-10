import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import { resetPassword } from '../api/auth'
import CustomPopup from '../components/PopUps/CustomPopup'
import { useSelector } from 'react-redux'

export default function ResetPassword({ navigation, route }) {
    const { email, code } = route.params 
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const user = useSelector(state => state.auth.user)
    const darkMode = useSelector(state => state.auth.darkMode)

    const handleReset = async () => {
        if (!password || password.length < 6) {
            setPopupMessage('La contraseña debe tener al menos 6 caracteres')
            setShowErrorPopup(true)
            return
        }
        if (password !== confirm) {
            setPopupMessage('Las contraseñas no coinciden')
            setShowErrorPopup(true)
            return
        }
        try {
            await resetPassword(email, password, code)
            setShowSuccessPopup(true)
        } catch (e) {
            setPopupMessage('No se pudo restablecer la contraseña')
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
            <Text className="text-xl text-secondary-light font-bold mb-2">Nueva Contraseña</Text>
            <Text className="text-center text-base text-primary-light mb-4">
            Ingresa tu nueva contraseña para {email}
            </Text>
        </View>
        <TextInput
            className="border-2 border-primary-light rounded-lg px-4 py-2 mb-4 text-primary-light bg-background-light"
            placeholder="Nueva contraseña"
            placeholderTextColor="#00808099"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <TextInput
            className="border-2 border-primary-light rounded-lg px-4 py-2 mb-6 text-primary-light bg-background-light"
            placeholder="Confirmar contraseña"
            placeholderTextColor="#00808099"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
        />
        <TouchableOpacity
            className="bg-primary-light rounded-lg py-3"
            onPress={handleReset}
        >
            <Text className="text-white text-lg font-bold text-center">Restablecer Contraseña</Text>
        </TouchableOpacity>
        <CustomPopup
            visible={showErrorPopup}
            onClose={() => setShowErrorPopup(false)}
            title="Error"
            message={popupMessage}
            color="#F76C6C"
            borderColor="#F76C6C"
            buttonText="Volver"
            darkMode={darkMode}
        />
        <CustomPopup
            visible={showSuccessPopup}
            onClose={() => {
                setShowSuccessPopup(false)
                if (user) {
                    navigation.navigate('Settings')
                } else {
                    navigation.navigate('Login')
                }
            }}
            title="¡Contraseña cambiada!"
            message="Tu contraseña fue restablecida correctamente. Ya puedes iniciar sesión."
            color="#008080"
            borderColor="#7AD7F0"
            buttonText={user ? "Ir a Ajustes" : "Iniciar sesión"}
            darkMode={darkMode}
        />
        </View>
    )
}