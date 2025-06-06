import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useSelector } from 'react-redux'
import CustomPopup from '../../components/PopUps/CustomPopup'
import { deleteUserWithCode } from '../../api/user'

export default function VerifyDeleteCode({ navigation, route }) {
    const { email } = route.params
    const userId = useSelector(state => state.auth.user?.id)
    const token = useSelector(state => state.auth.token)
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
        <View className="flex-1 bg-background-light px-6 justify-center">
            <View className="items-center mb-8">
                <Image
                    source={require('../../../assets/LogoApp.png')}
                    style={{ width: 120, height: 120, marginBottom: 8 }}
                    resizeMode="contain"
                />
                <Text className="text-xl text-secondary-light font-bold mb-2">Verificar Código</Text>
                <Text className="text-center text-base text-primary-light mb-4">
                    Ingresa el código de 6 dígitos que enviamos a tu correo para confirmar la eliminación de tu cuenta.
                </Text>
            </View>
            <TextInput
                className="border-2 border-primary-light rounded-lg px-4 py-2 mb-6 text-primary-light text-center text-2xl tracking-widest bg-background-light"
                placeholder="______"
                placeholderTextColor="#00808099"
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
            />
            <TouchableOpacity
                className="bg-primary-light rounded-lg py-3 mb-3"
                onPress={handleVerify}
            >
                <Text className="text-white text-lg font-bold text-center">Confirmar Código</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text className="text-primary-light text-center underline">Volver</Text>
            </TouchableOpacity>
            <CustomPopup
                visible={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                title="Código incorrecto"
                message={popupMessage}
                color="#F76C6C"
                borderColor="#F76C6C"
                buttonText="Volver"
            />
            <CustomPopup
                visible={showDeletedPopup}
                onClose={() => {}}
                title="Cuenta borrada"
                message="Tu cuenta fue borrada con éxito."
                color="#008080"
                borderColor="#7AD7F0"
                buttonText={null}
            />
        </View>
    )
}