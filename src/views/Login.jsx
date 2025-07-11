import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import LoginHeader from '../components/Login/LoginHeader'
import LoginInput from '../components/Login/LoginInput'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser} from '../api/auth'
import LoginErrorModal from '../components/PopUps/LoginErrorModal'
import { clearAuthError } from '../Redux/slices/AuthSlice'
import { useTranslation } from '../hooks/useTranslation'
import { useTheme } from '../context/ThemeContext'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const dispatch = useDispatch()
    const { user, loading, error } = useSelector(state => state.auth)
    const { t } = useTranslation()
    const { darkMode } = useTheme()

    const handleLogin = () => {
        const emailRegex = /^[\w-.]+@((gmail|hotmail|outlook|yahoo)\.(com|es))$/i
        if (!emailRegex.test(email)) {
            setShowErrorModal(true)
            return
        }
        dispatch(loginUser({ email, password }))
    }

    useEffect(() => {
        if (user && !loading && !error) {
            navigation.navigate('MainTabs', { screen: 'Home' })
        }
        if (error) {
            setShowErrorModal(true)
        }
    }, [user, loading, error])

    return (
        <View className={`flex-1 px-6 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <LoginHeader darkMode={darkMode} />
            <LoginInput
                label={`${t('email')}:`}
                icon="https://img.icons8.com/ios-filled/50/008080/new-post.png"
                placeholder={t('placeholders.email')}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                darkMode={darkMode}
            />
            <LoginInput
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
            <TouchableOpacity className="mb-6 mt-1" onPress={() => navigation.navigate('ForgotPassword')}>
                <Text 
                    className="text-base text-right"
                    style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                >
                    {t('forgotPassword')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                className={`rounded-lg w-full py-3 mb-3 ${darkMode ? 'bg-primary-dark' : 'bg-primary-light'}`}
                activeOpacity={0.8}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text className="text-white font-bold text-center text-lg">
                    {loading ? t('loading') : t('login')}
                </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-2">
                <Text 
                    className="text-base"
                    style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                >
                    {t('dontHaveAccount')} 
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text 
                        className="text-base font-bold underline"
                        style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                    >
                        {t('signUp')}
                    </Text>
                </TouchableOpacity>
            </View>
            <LoginErrorModal
                visible={showErrorModal}
                onClose={() => {
                    dispatch(clearAuthError())
                    setShowErrorModal(false)
                }}
                message={
                    !/^[\w-.]+@((gmail|hotmail|outlook|yahoo)\.(com|es))$/i.test(email)
                        ? t('invalidEmail')
                        : (error && (error.toLowerCase().includes('credencial') || error.toLowerCase().includes('contraseña') || error.toLowerCase().includes('password')))
                            ? t('incorrectCredentials')
                            : error
                }
                darkMode={darkMode}
            />
        </View>
    )
}