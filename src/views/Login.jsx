import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import LoginHeader from '../components/Login/LoginHeader'
import LoginInput from '../components/Login/LoginInput'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../api/auth'

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()
    const { user, loading, error } = useSelector(state => state.auth)

    const handleLogin = () => {
        dispatch(loginUser({ email, password }))
    }

    useEffect(() => {
        if (user && !loading && !error) {
            navigation.navigate('Home')
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
            {error && (
                <Text className="text-red-500 text-center mb-2">{error}</Text>
            )}
            <View className="flex-row justify-center mt-2">
                <Text className="text-xs text-primary-light">No tienes Cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text className="text-xs text-primary-light font-bold underline">Registrate</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}