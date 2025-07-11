import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from '../hooks/useTranslation'
import CustomPopup from '../components/PopUps/CustomPopup'

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('')
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const { darkMode } = useTheme()
    const { t } = useTranslation()

    const handleSend = () => {
        const emailRegex = /^[\w-.]+@((gmail|hotmail|outlook|yahoo)\.(com|es))$/i
        if (!emailRegex.test(email)) {
            setPopupMessage(t('invalidEmail'))
            setShowErrorPopup(true)
            return
        }
        setShowSuccessPopup(true)
    }

    return (
        <View className={`flex-1 px-6 justify-center ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <TouchableOpacity 
                className="absolute top-12 left-6"
                onPress={() => navigation.goBack()}
            >
                <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
            </TouchableOpacity>

            <View className="items-center mb-8">
                <Image
                    source={require('../../assets/LogoApp.png')}
                    style={{ width: 350, height: 350, marginBottom: 8 }}
                    resizeMode="contain"
                />
                <Text className={`text-center text-base mt-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    Ingresa tu correo y te enviaremos un código de verificación para restablecer tu contraseña.
                </Text>
            </View>
            
            <Text className={`text-base font-bold mb-1 ${darkMode ? 'text-primary-dark' : 'text-primary-light'}`}>
                Correo Electrónico
            </Text>
            <TextInput
                className={`border-2 rounded-lg px-4 py-2 mb-6 ${darkMode ? 'border-primary-dark bg-quaternary-dark text-text-dark' : 'border-primary-light bg-white text-primary-light'}`}
                placeholder="ejemplo@mail.com"
                placeholderTextColor={darkMode ? "#BFB9AD99" : "#00808099"}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            
            <TouchableOpacity
                className={`rounded-lg py-3 ${darkMode ? 'bg-primary-dark' : 'bg-primary-light'}`}
                onPress={handleSend}
            >
                <Text className="text-white text-lg font-bold text-center">
                    Enviar Código
                </Text>
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
                    navigation.goBack()
                }}
                title="¡Código enviado!"
                message="Revisa tu correo electrónico para continuar con la recuperación."
                color="#008080"
                borderColor="#7AD7F0"
                buttonText="Entendido"
                darkMode={darkMode}
            />
        </View>
    )
}