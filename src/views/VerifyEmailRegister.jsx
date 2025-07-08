import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import RegisterHeader from '../components/Register/RegisterHeader'
import { registerUser, clearRegisterSuccess, requestVerificationCode } from '../api/auth'
import CustomPopup from '../components/PopUps/CustomPopup'

export default function VerifyEmailRegister({ route, navigation }) {
    const { email, password, nombre, telefono } = route.params
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const [resendDisabled, setResendDisabled] = useState(true)
    const [timer, setTimer] = useState(60)
    const dispatch = useDispatch()
    const { registerSuccess, loading, error } = useSelector(state => state.auth)

    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    useEffect(() => {
        const requestCode = async () => {
            try {
                await requestVerificationCode(email)
                console.log(`Código de verificación solicitado para: ${email}`)
            } catch (error) {
                console.error('Error al solicitar código:', error)
                setPopupMessage('Error al enviar código de verificación')
                setShowErrorPopup(true)
            }
        }
        
        requestCode()
        
        const countdown = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    setResendDisabled(false)
                    clearInterval(countdown)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(countdown)
    }, [])

    useEffect(() => {
        if (registerSuccess && !loading && !error) {
            setShowSuccessPopup(true)
            setTimeout(() => {
                setShowSuccessPopup(false)
                dispatch(clearRegisterSuccess())
                navigation.navigate('Login')
            }, 2000)
        }
        if (error) {
            setPopupMessage(error)
            setShowErrorPopup(true)
        }
    }, [registerSuccess, loading, error])

    const handleCodeChange = (value, index) => {
        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        if (value && index < 5) {
            const nextInput = `codeInput${index + 1}`
        }
    }

    const handleConfirm = () => {
        const verificationCode = code.join('')
        
        if (verificationCode.length !== 6) {
            setPopupMessage('Por favor, ingrese el código completo de 6 dígitos')
            setShowErrorPopup(true)
            return
        }

        dispatch(registerUser({
            email,
            password,
            nombre,
            telefono,
            codigoVerificacion: verificationCode
        }))
    }

    const handleResendCode = async () => {
        try {
            await requestVerificationCode(email)
            console.log(`Código de verificación reenviado a: ${email}`)
            setResendDisabled(true)
            setTimer(60)
            setCode(['', '', '', '', '', ''])
            
            const countdown = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        setResendDisabled(false)
                        clearInterval(countdown)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        } catch (error) {
            console.error('Error al reenviar código:', error)
            setPopupMessage('Error al reenviar código de verificación')
            setShowErrorPopup(true)
        }
    }

    return (
        <View className="flex-1 bg-background-light px-6">
            <RegisterHeader />
            
            <View className="flex-1 justify-center items-center">
                <Text className="text-primary-light text-2xl font-bold text-center mb-2">
                    Verificar Mail
                </Text>
                
                <Text className="text-secondary-light text-center mb-8 px-4">
                    Por favor, ingrese el código de 6 dígitos enviado a su correo
                </Text>
                <View className="flex-row justify-center mb-8">
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            className="w-12 h-12 bg-white rounded-lg text-center text-xl font-bold text-primary-light mx-2 border border-gray-300"
                            value={digit}
                            onChangeText={(value) => handleCodeChange(value.slice(-1), index)}
                            keyboardType="numeric"
                            maxLength={1}
                            placeholder=""
                        />
                    ))}
                </View>
                <TouchableOpacity
                    className="bg-primary-light rounded-lg w-full py-3 mb-4"
                    activeOpacity={0.8}
                    onPress={handleConfirm}
                    disabled={loading}
                >
                    <Text className="text-white text-base font-bold text-center">
                        {loading ? 'Confirmando...' : 'Confirmar'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`${resendDisabled ? 'opacity-50' : ''}`}
                    onPress={handleResendCode}
                    disabled={resendDisabled}
                    activeOpacity={0.7}
                >
                    <Text className="text-primary-light text-base">
                        {resendDisabled ? `Reenviar Código (${timer}s)` : 'Reenviar Código'}
                    </Text>
                </TouchableOpacity>
            </View>

            <CustomPopup
                visible={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                title="Error"
                message={popupMessage}
                color="#F76C6C"
                borderColor="#F76C6C"
                buttonText="Volver"
            />
            
            <CustomPopup
                visible={showSuccessPopup}
                onClose={() => {}}
                title="¡Cuenta creada con éxito!"
                message="Tu cuenta fue creada exitosamente. Ahora puedes iniciar sesión."
                color="#008080"
                borderColor="#7AD7F0"
                buttonText={null}
            />
        </View>
    )
}
