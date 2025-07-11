import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from '../hooks/useTranslation'
import CustomPopup from '../components/PopUps/CustomPopup'
import { verifyResetCode } from '../api/auth'

export default function VerifyCode({ navigation, route }) {
    const { email } = route.params
    const [code, setCode] = useState('')
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [loading, setLoading] = useState(false)
    const { darkMode } = useTheme()
    const { t } = useTranslation()

    const handleVerify = async () => {
        if (code.length !== 6) {
            setShowErrorPopup(true)
            return
        }
        
        setLoading(true)
        try {
            await verifyResetCode(email, code)
            setShowSuccessPopup(true)
        } catch (e) {
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
                <Text className={`text-center text-base  mt-4 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    {t('verifyCodeResetMessage')}
                </Text>
            </View>
            
            <TextInput
                className={`border-2 rounded-lg px-4 py-2 mb-6 text-center text-2xl tracking-widest ${darkMode ? 'border-primary-dark bg-quaternary-dark text-text-dark' : 'border-primary-light bg-white text-primary-light'}`}
                placeholder="______"
                placeholderTextColor={darkMode ? "#07919A99" : "#00808099"}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
            />
            
            <TouchableOpacity
                className={`rounded-lg py-3 mb-3 ${darkMode ? 'bg-primary-dark' : 'bg-primary-light'}`}
                onPress={handleVerify}
                disabled={loading}
                activeOpacity={0.85}
            >
                <Text className="text-white text-lg font-bold text-center">
                    {loading ? 'Verificando...' : t('confirmCode')}
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => {/* reenviar código */}}>
                <Text className={`text-center underline ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    {t('resendCode')}
                </Text>
            </TouchableOpacity>
            
            <CustomPopup
                visible={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                title={t('incorrectCodeTitle')}
                message={t('incorrectCodeMessage')}
                color="#F76C6C"
                borderColor="#F76C6C"
                buttonText={t('back')}
                darkMode={darkMode}
            />
            <CustomPopup
                visible={showSuccessPopup}
                onClose={() => {
                    setShowSuccessPopup(false)
                    navigation.navigate('ResetPassword', { email, code })
                }}
                title={t('correctCodeTitle')}
                message={t('correctCodeMessage')}
                color="#008080"
                borderColor="#7AD7F0"
                buttonText={t('continue')}
                darkMode={darkMode}
            />
        </View>
    )
}