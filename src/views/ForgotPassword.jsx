import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from '../hooks/useTranslation'
import CustomPopup from '../components/PopUps/CustomPopup'
import { requestPasswordReset } from '../api/auth'

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('')
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const { darkMode } = useTheme()
    const { t } = useTranslation()

    const handleSend = async () => {
        const emailRegex = /^[\w-.]+@((gmail|hotmail|outlook|yahoo)\.(com|es))$/i
        if (!emailRegex.test(email)) {
            setPopupMessage(t('invalidEmail'))
            setShowErrorPopup(true)
            return
        }
        
        setLoading(true)
        try {
            await requestPasswordReset(email)
            setShowSuccessPopup(true)
        } catch (e) {
            setPopupMessage(e?.mensaje || e?.message || 'No se pudo enviar el código')
            setShowErrorPopup(true)
        }
        setLoading(false)
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
            
            <Text className={`text-base font-bold mb-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                Correo Electrónico
            </Text>
            
            <View className={`flex-row items-center border-2 rounded-lg px-4 mb-6 ${darkMode ? 'border-primary-dark bg-quaternary-dark text-text-dark' : 'border-primary-light bg-white'}`}>
                <Image 
                    source={{ uri: 'https://img.icons8.com/ios-filled/50/008080/email.png' }} 
                    className="w-5 h-5 mr-3"
                />
                <TextInput
                    className={`flex-1 py-3 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}
                    placeholder="ejemplo@mail.com"
                    placeholderTextColor={darkMode ? "#BFB9AD99" : "#00808099"}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>
            
            <TouchableOpacity
                className={`rounded-lg py-4 ${darkMode ? 'bg-primary-dark' : 'bg-primary-light'}`}
                onPress={handleSend}
                disabled={loading}
                activeOpacity={0.85}
            >
                <Text className="text-white text-lg font-bold text-center">
                    {loading ? 'Enviando...' : 'Enviar Código'}
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
                    navigation.navigate('VerifyCode', { email })
                }}
                title="¡Código enviado!"
                message="Revisa tu correo electrónico para continuar con la recuperación."
                color="#008080"
                borderColor="#7AD7F0"
                buttonText="Continuar"
                darkMode={darkMode}
            />
        </View>
    )
}