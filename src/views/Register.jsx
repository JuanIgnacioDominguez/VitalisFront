import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import RegisterHeader from '../components/Register/RegisterHeader'
import RegisterInput from '../components/Register/RegisterInput'
import { registerUser, clearRegisterSuccess, checkEmail } from '../api/auth' 
import CustomPopup from '../components/PopUps/CustomPopup'
import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../context/ThemeContext'

export default function Register({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { registerSuccess, error } = useSelector(state => state.auth)
    const { t } = useTranslation()
    const { darkMode } = useTheme()

    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    useEffect(() => {
        if (error) {
            if (
                error.toLowerCase().includes('email') && 
                (error.toLowerCase().includes('ya existe') || 
                    error.toLowerCase().includes('registrado') ||
                    error.toLowerCase().includes('already exists') ||
                    error.toLowerCase().includes('duplicate'))
            ) {
                setPopupMessage(t('emailAlreadyRegistered'))
            } else {
                setPopupMessage(error)
            }
            setShowErrorPopup(true)
        }
    }, [error, t])

    const handleRegister = async () => {
        if (!email.trim() || !password.trim() || !fullName.trim() || !phone.trim()) {
            setPopupMessage(t('allFieldsRequired'))
            setShowErrorPopup(true)
            return
        }

        const emailRegex = /^[\w-.]+@((gmail|hotmail|outlook|yahoo)\.(com|es))$/i
        if (!emailRegex.test(email)) {
            setPopupMessage(t('validEmailError'))
            setShowErrorPopup(true)
            return
        }
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
        if (!nameRegex.test(fullName)) {
            setPopupMessage(t('nameValidationError'))
            setShowErrorPopup(true)
            return
        }
        if (phone.length !== 10) {
            setPopupMessage(t('phoneValidationError'))
            setShowErrorPopup(true)
            return
        }
        if (password.length < 6) {
            setPopupMessage(t('passwordMinError'))
            setShowErrorPopup(true)
            return
        }

        setLoading(true)
        try {
            await checkEmail(email)
            navigation.navigate('VerifyEmailRegister', {
                email,
                password,
                nombre: fullName,
                telefono: phone
            })
        } catch (error) {
            const errorData = error?.response?.data
            if (error?.response?.status === 409 || errorData?.codigo === 'EMAIL_EXISTS') {
                setPopupMessage('Este correo electrónico ya está registrado. Por favor, usa otro email o inicia sesión.')
            } else {
                setPopupMessage(errorData?.mensaje || 'Error al verificar el email')
            }
            setShowErrorPopup(true)
        } finally {
            setLoading(false)
        }
    }

    const handlePhoneChange = (text) => {
        const filtered = text.replace(/[^0-9]/g, '').slice(0, 10)
        setPhone(filtered)
    }

    return (
        <View className={`flex-1 px-6 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <RegisterHeader darkMode={darkMode} />
            <RegisterInput
                label={`${t('email')}:`}
                icon="https://img.icons8.com/ios-filled/50/008080/new-post.png"
                placeholder={t('placeholders.email')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                darkMode={darkMode}
            />
            <RegisterInput
                label={`${t('password')}:`}
                icon="https://img.icons8.com/ios-filled/50/008080/lock-2.png"
                placeholder={t('placeholders.password')}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isPassword
                darkMode={darkMode}
            />
            <RegisterInput
                label={`${t('fullName')}:`}
                icon="https://img.icons8.com/ios-filled/50/008080/user.png"
                placeholder={t('fullName')}
                value={fullName}
                onChangeText={setFullName}
                darkMode={darkMode}
            />
            <RegisterInput
                label={`${t('phone')}:`}
                icon="https://img.icons8.com/ios-filled/50/008080/phone.png"
                placeholder="1121571748"
                value={phone}
                onChangeText={handlePhoneChange} 
                keyboardType="phone-pad"
                darkMode={darkMode}
            />
            <TouchableOpacity
                className={`rounded-lg w-full py-3 mb-3 mt-2 ${darkMode ? 'bg-primary-dark' : 'bg-primary-light'}`}
                activeOpacity={0.8}
                onPress={handleRegister}
                disabled={loading}
            >
                <Text className="text-white text-base font-bold text-center">
                    {loading ? 'Verificando...' : t('createAccount')}
                </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-2">
                <Text 
                    className="text-base "
                    style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                >
                    {t('alreadyHaveAccount')} 
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text 
                        className="text-base font-bold underline"
                        style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                    >
                        {t('signIn')}
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
                darkMode={darkMode}
            />
        </View>
    )
}