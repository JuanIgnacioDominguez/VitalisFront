import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import RegisterHeader from '../components/Register/RegisterHeader'
import RegisterInput from '../components/Register/RegisterInput'
import { registerUser, clearRegisterSuccess } from '../api/auth' 
import CustomPopup from '../components/PopUps/CustomPopup'

export default function Register({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const dispatch = useDispatch()
    const { registerSuccess, loading, error } = useSelector(state => state.auth)

    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const handleRegister = () => {
        const emailRegex = /^[\w-.]+@((gmail|hotmail|outlook|yahoo)\.(com|es))$/i
        if (!emailRegex.test(email)) {
            setPopupMessage('Ingrese un email válido (gmail, hotmail, outlook, yahoo)')
            setShowErrorPopup(true)
            return
        }
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
        if (!nameRegex.test(fullName)) {
            setPopupMessage('El nombre no puede tener caracteres especiales ni números')
            setShowErrorPopup(true)
            return
        }
        if (phone.length !== 10) {
            setPopupMessage('El número de teléfono debe tener 10 dígitos')
            setShowErrorPopup(true)
            return
        }
        if (password.length < 6) {
            setPopupMessage('La contraseña debe tener al menos 6 caracteres')
            setShowErrorPopup(true)
            return
        }
        
        navigation.navigate('VerifyEmailRegister', {
            email,
            password,
            nombre: fullName,
            telefono: phone
        })
    }

    const handlePhoneChange = (text) => {
        const filtered = text.replace(/[^0-9]/g, '').slice(0, 10)
        setPhone(filtered)
    }

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
                onChangeText={handlePhoneChange} 
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
            <View className="flex-row justify-center mt-2">
                <Text className="text-xs text-primary-light">Ya tienes cuenta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text className="text-xs text-primary-light font-bold underline">Inicia Sesión</Text>
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
        </View>
    )
}