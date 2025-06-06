import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import LoginHeader from '../components/Login/LoginHeader'
import LoginInput from '../components/Login/LoginInput'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser} from '../api/auth'
import LoginErrorModal from '../components/PopUps/LoginErrorModal'
import { clearAuthError } from '../Redux/slices/AuthSlice'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showErrorModal, setShowErrorModal] = useState(false)
    const dispatch = useDispatch()
    const { user, loading, error } = useSelector(state => state.auth)

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
        <View className="flex-1 bg-background-light px-6">
            <LoginHeader />
            <LoginInput
                label="Email:"
                icon="https://img.icons8.com/ios-filled/50/008080/new-post.png"
                placeholder="ejemplo@mail.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <LoginInput
                label="Contraseña:"
                icon="https://img.icons8.com/ios-filled/50/008080/lock-2.png"
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isPassword
            />
            <TouchableOpacity className="mb-6 mt-1" onPress={() => navigation.navigate('ForgotPassword')}>
                <Text className="text-xs text-primary-light text-right">Olvidé mi Contraseña</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className="bg-primary-light rounded-lg w-full py-3 mb-3"
                activeOpacity={0.8}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text className="text-white font-bold text-center text-lg">
                    {loading ? 'Ingresando...' : 'Iniciar Sesion'}
                </Text>
            </TouchableOpacity>
            <View className="flex-row justify-center mt-2">
                <Text className="text-xs text-primary-light">No tienes Cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text className="text-xs text-primary-light font-bold underline">Registrate</Text>
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
                        ? 'Ingrese un email válido (gmail, hotmail, outlook, yahoo)'
                        : (error && (error.toLowerCase().includes('credencial') || error.toLowerCase().includes('contraseña') || error.toLowerCase().includes('password')))
                            ? 'Mail o contraseña incorrecta'
                            : error
                }
            />
        </View>
    )
}