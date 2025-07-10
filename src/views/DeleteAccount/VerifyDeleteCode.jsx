import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import CustomPopup from '../../components/PopUps/CustomPopup'
import { deleteUserWithCode } from '../../api/user'
import { logout } from '../../Redux/slices/AuthSlice'
import { useTheme } from '../../context/ThemeContext'

export default function VerifyDeleteCode({ navigation, route }) {
    const { email } = route.params
    const userId = useSelector(state => state.auth.user?.id)
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const { darkMode } = useTheme()
    const [code, setCode] = useState('')
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [showDeletedPopup, setShowDeletedPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    const handleVerify = async () => {
        console.log('handleVerify ejecutado')
        if (code.length !== 6) {
            setPopupMessage('El código debe tener 6 dígitos')
            setShowErrorPopup(true)
            return
        }
        try {
            await deleteUserWithCode(userId, code, token)
            setShowSuccessPopup(false)
            setShowDeletedPopup(true)
            setTimeout(() => {
                setShowDeletedPopup(false)
                dispatch(logout()) 
                navigation.navigate('FirstView')
            }, 2000)
        } catch (e) {
            setPopupMessage(
                e?.mensaje ||
                e?.message ||
                'El código ingresado es incorrecto o expiró. Intenta nuevamente.'
            )
            setShowErrorPopup(true)
        }
    }

    return (
        <View className={`flex-1 px-6 justify-center ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <View className="items-center mb-8">
                <Image
                    source={require('../../../assets/LogoApp.png')}
                    style={{ width: 300, height: 300, marginBottom: 8 }}
                    resizeMode="contain"
                />
                <Text 
                    className="text-center text-base mb-2 mt-6"
                    style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                >
                    Ingresa el código de 6 dígitos que enviamos a tu correo para confirmar la eliminación de tu cuenta.
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
                onPress={handleVerify}
            >
                <Text className="text-white text-lg font-bold text-center">Confirmar Código</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text 
                    className="text-center underline"
                    style={{ color: darkMode ? '#E6E6E6' : '#008080' }}
                >
                    Volver
                </Text>
            </TouchableOpacity>
            <CustomPopup
                visible={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                title="Código incorrecto"
                message={popupMessage}
                color="#F76C6C"
                borderColor="#F76C6C"
                buttonText="Volver"
                darkMode={darkMode}
            />
            <CustomPopup
                visible={showDeletedPopup}
                onClose={() => {}}
                title="Cuenta borrada"
                message="Tu cuenta fue borrada con éxito."
                color="#008080"
                borderColor="#7AD7F0"
                buttonText={null}
                darkMode={darkMode}
            />
        </View>
    )
}