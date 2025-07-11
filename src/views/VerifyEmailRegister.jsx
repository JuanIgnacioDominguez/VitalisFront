import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { registerUser, clearRegisterSuccess } from '../api/auth' 
import { requestVerificationCode } from '../api/auth'
import CustomPopup from '../components/PopUps/CustomPopup'
import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../context/ThemeContext'

export default function VerifyEmailRegister({ route, navigation }) {
    const { email, password, nombre, telefono } = route.params
    const [code, setCode] = useState('')
    const [resendDisabled, setResendDisabled] = useState(true)
    const [timer, setTimer] = useState(60)
    const dispatch = useDispatch()
    const { registerSuccess, loading, error } = useSelector(state => state.auth)
    const { t } = useTranslation()
    const { darkMode } = useTheme()

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
                setPopupMessage(t('codeRequestError'))
                setShowErrorPopup(true)
            }
        }
    
        requestCode()
        startTimer()
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

    const handleConfirm = () => {
        if (code.length !== 6) {
            setPopupMessage(t('completeCodeError'))
            setShowErrorPopup(true)
            return
        }

        dispatch(registerUser({
            email,
            password,
            nombre,
            telefono,
            codigoVerificacion: code
        }))
    }

    const handleResendCode = async () => {
        try {
            await requestVerificationCode(email)
            console.log(`Código de verificación reenviado a: ${email}`)
            setCode('') 
            startTimer()
        } catch (error) {
            console.error('Error al reenviar código:', error)
            setPopupMessage(t('codeResendError'))
            setShowErrorPopup(true)
        }
    }

    return (
        <View className={`flex-1 px-6 justify-center ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <TouchableOpacity 
                onPress={() => navigation.goBack()}
                className="absolute top-12 left-6 z-10"
            >
                <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
            </TouchableOpacity>

            <View className="items-center mb-8">
                <Image
                    source={require('../../assets/LogoApp.png')}
                    style={{ width: 350, height: 350, marginBottom: 8 }}
                    resizeMode="contain"
                />
                <Text 
                    className="text-center text-lg mt-5"
                    style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                >
                    {t('verifyCodeMessage')}
                </Text>
            </View>
            
            <TextInput
                className={`border-2 rounded-lg px-4 py-2 mb-6 text-center text-2xl tracking-widest ${darkMode ? 'border-primary-dark bg-quaternary-dark' : 'border-primary-light bg-background-light'}`}
                style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                placeholder="______"
                placeholderTextColor={darkMode ? "#A0A0A0" : "#00808099"}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
            />
            
            <TouchableOpacity
                className={`rounded-lg py-3 mb-3 ${darkMode ? 'bg-primary-dark' : 'bg-primary-light'}`}
                onPress={handleConfirm}
                disabled={loading}
            >
                <Text className="text-white text-lg font-bold text-center">
                    {loading ? t('confirming') : t('confirm')}
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                onPress={handleResendCode}
                disabled={resendDisabled}
                className={`${resendDisabled ? 'opacity-50' : ''}`}
            >
                <Text 
                    className="text-center underline"
                    style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                >
                    {resendDisabled ? t('resendCodeTimer').replace('{timer}', timer) : t('resendCode')}
                </Text>
            </TouchableOpacity>
            
            <CustomPopup
                visible={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                title={t('error')}
                message={popupMessage}
                color="#F76C6C"
                borderColor="#F76C6C"
                buttonText={t('back')}
                darkMode={darkMode}
            />
            <CustomPopup
                visible={showSuccessPopup}
                onClose={() => {}}
                title={t('accountCreatedTitle')}
                message={t('accountCreatedMessage')}
                color="#008080"
                borderColor="#7AD7F0"
                buttonText={null}
                darkMode={darkMode}
            />
        </View>
    )
}
