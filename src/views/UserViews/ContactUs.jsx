import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import BottomNavbar from '../../components/BotomNavbar/BottomNavbar'
import { sendContactMessage } from '../../api/user'
import { useSelector } from 'react-redux' 
import { API_HOST } from '../../utils/constants'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from '../../hooks/useTranslation'
import CustomPopup from '../../components/PopUps/CustomPopup'

export default function ContactUs({ navigation }) {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.auth.token)
    const { darkMode } = useTheme()
    const { t } = useTranslation()
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const handleSend = async () => {
        if (!nombre || !email || !mensaje) {
            setPopupMessage(t('completeAllFields'))
            setShowErrorPopup(true)
            return
        }
        const emailRegex = /^[\w-.]+@((gmail|hotmail|outlook|yahoo)\.(com|es))$/i
        if (!emailRegex.test(email)) {
            setPopupMessage(t('invalidEmail'))
            setShowErrorPopup(true)
            return
        }
        setLoading(true)
        try {
            await sendContactMessage({ nombre, email, mensaje }, token)
            setShowSuccessPopup(true)
            setNombre('')
            setEmail('')
            setMensaje('')
        } catch (e) {
            console.log('Error al enviar mensaje:', e)
            setPopupMessage('No se pudo enviar el mensaje')
            setShowErrorPopup(true)
        }
        setLoading(false)
    }

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
                <View className="flex-row items-center mt-12 mb-6 px-6">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
                    </TouchableOpacity>
                    <Text className={`text-2xl font-bold flex-1 text-center mr-8 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                        {t('contactUs')}
                    </Text>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View className="px-6">
                        <TextInput
                            className={`border-2 rounded-lg px-4 py-3 mb-4 ${darkMode ? 'border-primary-dark bg-background-dark text-text-dark' : 'border-primary-light bg-background-light text-primary-light'}`}
                            placeholder={t('placeholders.name')}
                            placeholderTextColor={darkMode ? "#07919A99" : "#00808099"}
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            className={`border-2 rounded-lg px-4 py-3 mb-4 ${darkMode ? 'border-primary-dark bg-background-dark text-text-dark' : 'border-primary-light bg-background-light text-primary-light'}`}
                            placeholder={t('placeholders.email')}
                            placeholderTextColor={darkMode ? "#07919A99" : "#00808099"}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            className={`border-2 rounded-lg px-4 py-3 mb-8 ${darkMode ? 'border-primary-dark bg-background-dark text-text-dark' : 'border-primary-light bg-background-light text-primary-light'}`}
                            placeholder={t('placeholders.message')}
                            placeholderTextColor={darkMode ? "#07919A99" : "#00808099"}
                            value={mensaje}
                            onChangeText={setMensaje}
                            multiline
                            numberOfLines={5}
                            style={{ minHeight: 100, textAlignVertical: 'top' }}
                        />
                        <TouchableOpacity
                            className={`${darkMode ? 'bg-primary-dark' : 'bg-primary-light'} rounded-lg py-3`}
                            onPress={handleSend}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <Text className="text-white text-lg font-bold text-center">
                                {loading ? t('sending') : t('send')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
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
                onClose={() => setShowSuccessPopup(false)}
                title={t('deleteCodeSent')}
                message={t('deleteCodeSentMessage')}
                color="#008080"
                borderColor="#7AD7F0"
                buttonText={t('back')}
                darkMode={darkMode}
            />
        </View>
    )
}