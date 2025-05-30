import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import RegisterHeader from '../components/Register/RegisterHeader'
import RegisterInput from '../components/Register/RegisterInput'
import { registerUser } from '../Redux/slices/authSlice'

export default function Register({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const dispatch = useDispatch()
    const { user, loading, error } = useSelector(state => state.auth)

    const handleRegister = () => {
        dispatch(registerUser({
            email,
            password,
            nombre: fullName,
            telefono: phone
        }))
    }

    useEffect(() => {
        if (user && !loading && !error) {
            navigation.navigate('Login')
        }
    }, [user, loading, error])

    return (
        <View className="flex-1 bg-background-light px-6">
        <RegisterHeader />
        <RegisterInput
            label="Email:"
            icon="https://img.icons8.com/ios-filled/50/008080/new-post.png"
            placeholder="ejemplo@mail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
        />
        <RegisterInput
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
        <RegisterInput
            label="Nombre Completo:"
            icon="https://img.icons8.com/ios-filled/50/008080/user.png"
            placeholder="Nombre Completo"
            value={fullName}
            onChangeText={setFullName}
        />
        <RegisterInput
            label="Telefono:"
            icon="https://img.icons8.com/ios-filled/50/008080/phone.png"
            placeholder="1121571748"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
        />
        <TouchableOpacity
            className="bg-primary-light rounded-lg w-full py-3 mb-3 mt-2"
            activeOpacity={0.8}
            onPress={handleRegister}
            disabled={loading}
        >
            <Text className="text-white text-base font-bold text-center">
                {loading ? 'Creando...' : 'Crear Cuenta'}
            </Text>
        </TouchableOpacity>
        {error && (
            <Text className="text-red-500 text-center mb-2">{error}</Text>
        )}
        <View className="flex-row justify-center mt-2">
            <Text className="text-xs text-primary-light">Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-xs text-primary-light font-bold underline">Inicia Sesión</Text>
            </TouchableOpacity>
        </View>
        </View>
    )
}