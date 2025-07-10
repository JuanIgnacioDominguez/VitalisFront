import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import RegisterHeader from '../components/Register/RegisterHeader'
import { registerUser, clearRegisterSuccess } from '../api/auth' 
import { requestVerificationCode } from '../api/auth'
import CustomPopup from '../components/PopUps/CustomPopup'
import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../context/ThemeContext'

export default function VerifyEmailRegister({ route, navigation }) {
    const { email, password, nombre, telefono } = route.params
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const [resendDisabled, setResendDisabled] = useState(true)
    const [timer, setTimer] = useState(60)
    const dispatch = useDispatch()
    const { registerSuccess, loading, error } = useSelector(state => state.auth)
    const { t } = useTranslation()
    const { darkMode } = useTheme()

    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const inputRefs = useRef([])

    useEffect(() => {
        const requestCode = async () => {
            try {
                await requestVerificationCode(email)
                console.log(`Código de verificación solicitado para: ${email}`)
            } catch (error) {
                console.error('Error al solicitar código:', error)
                setPopupMessage(t('codeRequestError'))
                setShowErrorPopup(true)
            }
        }
    
        requestCode()
        startTimer()
        
        setTimeout(() => {
            inputRefs.current[0]?.focus()
        }, 100)
    }, [])

    const startTimer = () => {
        setResendDisabled(true)
        setTimer(60)
        
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
    }

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
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace') {
            const newCode = [...code]
            
            if (code[index]) {
                newCode[index] = ''
                setCode(newCode)
            } else if (index > 0) {
                newCode[index - 1] = ''
                setCode(newCode)
                inputRefs.current[index - 1]?.focus()
            }
        }
    }

    const handleConfirm = () => {
        const verificationCode = code.join('')
        
        if (verificationCode.length !== 6) {
            setPopupMessage(t('completeCodeError'))
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
            setCode(['', '', '', '', '', '']) 
            startTimer()
            setTimeout(() => {
                inputRefs.current[0]?.focus()
            }, 100)
        } catch (error) {
            console.error('Error al reenviar código:', error)
            setPopupMessage(t('codeResendError'))
            setShowErrorPopup(true)
        }
    }

    return (
        <View className={`flex-1 px-6 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <RegisterHeader darkMode={darkMode} />
            <View className="flex-1 justify-center items-center">
                <Text 
                    className="text-center mb-8 px-4"
                    style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                >
                    {t('verifyCodeMessage')}
                </Text>
                <View className="flex-row justify-center mb-8">
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={ref => inputRefs.current[index] = ref}
                            className={`w-12 h-12 rounded-lg text-center text-xl font-bold mx-2 border ${darkMode ? 'bg-quaternary-dark border-primary-dark' : 'bg-white border-gray-300'}`}
                            style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                            value={digit}
                            onChangeText={(value) => handleCodeChange(value.slice(-1), index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            placeholder=""
                            selectTextOnFocus={true}
                        />
                    ))}
                </View>
                <TouchableOpacity
                    className={`rounded-lg w-full py-3 mb-4 ${darkMode ? 'bg-primary-dark' : 'bg-primary-light'}`}
                    activeOpacity={0.8}
                    onPress={handleConfirm}
                    disabled={loading}
                >
                    <Text className="text-white text-base font-bold text-center">
                        {loading ? t('confirming') : t('confirm')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`${resendDisabled ? 'opacity-50' : ''}`}
                    onPress={handleResendCode}
                    disabled={resendDisabled}
                    activeOpacity={0.7}
                >
                    <Text 
                        className="text-base"
                        style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                    >
                        {resendDisabled ? t('resendCodeTimer').replace('{timer}', timer) : t('resendCode')}
                    </Text>
                </TouchableOpacity>
            </View>
            
            <CustomPopup
                visible={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                title={t('error')}
                message={popupMessage}
                color="#F76C6C"
                borderColor="#F76C6C"
                buttonText={t('back')}
            />
            <CustomPopup
                visible={showSuccessPopup}
                onClose={() => {}}
                title={t('accountCreatedTitle')}
                message={t('accountCreatedMessage')}
                color="#008080"
                borderColor="#7AD7F0"
                buttonText={null}
            />
        </View>
    )
}
