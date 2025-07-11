import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from '../hooks/useTranslation'
import CustomPopup from '../components/PopUps/CustomPopup'
import { resetPassword } from '../api/auth'
import { useSelector } from 'react-redux'

export default function ResetPassword({ navigation, route }) {
    const { email, code } = route.params 
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.auth.user)
    const { darkMode } = useTheme()
    const { t } = useTranslation()

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
        
        setLoading(true)
        try {
            await resetPassword(email, password, code)
            setShowSuccessPopup(true)
        } catch (e) {
            setPopupMessage('No se pudo restablecer la contraseña')
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
                    Ingresa tu nueva contraseña para {email}
                </Text>
            </View>
            
            <View className={`flex-row items-center border-2 rounded-lg px-3 mb-4 ${darkMode ? 'border-primary-dark bg-quaternary-dark text-text-dark' : 'border-primary-light bg-white'}`}>
                <Image 
                    source={{ uri: 'https://img.icons8.com/ios-filled/50/008080/lock-2.png' }} 
                    className="w-5 h-5 mr-2"
                />
                <TextInput
                    className={`flex-1 py-3 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}
                    placeholder="Nueva contraseña"
                    placeholderTextColor={darkMode ? "#BFB9AD99" : "#00808099"}
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
            
            <View className={`flex-row items-center border-2 rounded-lg px-3 mb-6 ${darkMode ? 'border-primary-dark bg-quaternary-dark text-text-dark' : 'border-primary-light bg-white'}`}>
                <Image 
                    source={{ uri: 'https://img.icons8.com/ios-filled/50/008080/lock-2.png' }} 
                    className="w-5 h-5 mr-2"
                />
                <TextInput
                    className={`flex-1 py-3 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}
                    placeholder="Confirmar contraseña"
                    placeholderTextColor={darkMode ? "#BFB9AD99" : "#00808099"}
                    value={confirm}
                    onChangeText={setConfirm}
                    secureTextEntry={!showConfirm}
                />
                <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                    <Image
                        source={{
                            uri: showConfirm
                                ? 'https://img.icons8.com/ios-filled/50/008080/visible--v1.png'
                                : 'https://img.icons8.com/ios-filled/50/008080/invisible.png'
                        }}
                        className="w-5 h-5 ml-2"
                    />
                </TouchableOpacity>
            </View>
            
            <TouchableOpacity
                className={`rounded-lg py-4 ${darkMode ? 'bg-primary-dark' : 'bg-primary-light'}`}
                onPress={handleReset}
                disabled={loading}
                activeOpacity={0.85}
            >
                <Text className="text-white text-lg font-bold text-center">
                    {loading ? 'Restableciendo...' : 'Restablecer Contraseña'}
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