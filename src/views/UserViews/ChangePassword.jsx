import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useTheme } from '../../context/ThemeContext'
import { useTranslation } from '../../hooks/useTranslation'
import { changePassword } from '../../api/user'
import { useSelector } from 'react-redux'
import CustomPopup from '../../components/PopUps/CustomPopup'

const icon = 'https://img.icons8.com/ios-filled/50/008080/lock-2.png'

export default function ChangePassword({ navigation }) {
    const { darkMode } = useTheme()
    const { t } = useTranslation()
    const [current, setCurrent] = useState('')
    const [newPass, setNewPass] = useState('')
    const [confirm, setConfirm] = useState('')
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const userId = useSelector(state => state.auth.user?.id)
    const token = useSelector(state => state.auth.token)

    const handleSave = async () => {
        if (!current || !newPass || !confirm) {
            setPopupMessage(t('completeAllFields'))
            setShowErrorPopup(true)
            return
        }
        if (newPass !== confirm) {
            setPopupMessage(t('passwordsDoNotMatch'))
            setShowErrorPopup(true)
            return
        }
        try {
            await changePassword(userId, current, newPass, token)
            setShowSuccessPopup(true)
        } catch (e) {
            if (
                e?.mensaje?.toLowerCase().includes('actual') ||
                e?.mensaje?.toLowerCase().includes('incorrecta') ||
                e?.message?.toLowerCase().includes('actual') ||
                e?.message?.toLowerCase().includes('incorrecta')
            ) {
                setPopupMessage('La contraseña actual no es correcta')
            } else {
                setPopupMessage(e?.mensaje || e?.message || 'No se pudo cambiar la contraseña')
            }
            setShowErrorPopup(true)
        }
    }

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light mt-6'}`}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 40 }}>
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
                    </TouchableOpacity>
                    <Text className={`text-2xl font-bold flex-1 text-center mr-8 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                        Contraseña
                    </Text>
                </View>
                <Text className={`text-base font-bold mb-1 ${darkMode ? 'text-primary-dark' : 'text-primary-light'}`}>Contraseña Actual</Text>
                <View className={`flex-row items-center border-2 rounded-lg px-3 mb-1 ${darkMode ? 'border-primary-dark' : 'border-primary-light'}`}>
                    <Image source={{ uri: icon }} className="w-5 h-5 mr-2" />
                    <TextInput
                        className={`flex-1 py-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}
                        placeholder="Contraseña"
                        placeholderTextColor={darkMode ? "#07919A99" : "#00808099"}
                        value={current}
                        onChangeText={setCurrent}
                        secureTextEntry={!showCurrent}
                    />
                    <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
                        <Image
                            source={{
                                uri: showCurrent
                                    ? 'https://img.icons8.com/ios-filled/50/008080/visible--v1.png'
                                    : 'https://img.icons8.com/ios-filled/50/008080/invisible.png'
                            }}
                            className="w-5 h-5 ml-2"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPassword')}
                    style={{ alignSelf: 'flex-end', marginBottom: 16 }}
                >
                    <Text className="text-xs" style={{ color: '#008080', textDecorationLine: 'underline' }}>
                        Olvido Su Contraseña?
                    </Text>
                </TouchableOpacity>
                <Text className={`text-base font-bold mb-1 ${darkMode ? 'text-primary-dark' : 'text-primary-light'}`}>Nueva Contraseña</Text>
                <View className={`flex-row items-center border-2 rounded-lg px-3 mb-4 ${darkMode ? 'border-primary-dark' : 'border-primary-light'}`}>
                    <Image source={{ uri: icon }} className="w-5 h-5 mr-2" />
                    <TextInput
                        className={`flex-1 py-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}
                        placeholder="NuevaContra"
                        placeholderTextColor={darkMode ? "#07919A99" : "#00808099"}
                        value={newPass}
                        onChangeText={setNewPass}
                        secureTextEntry={!showNew}
                    />
                    <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                        <Image
                            source={{
                                uri: showNew
                                    ? 'https://img.icons8.com/ios-filled/50/008080/visible--v1.png'
                                    : 'https://img.icons8.com/ios-filled/50/008080/invisible.png'
                            }}
                            className="w-5 h-5 ml-2"
                        />
                    </TouchableOpacity>
                </View>
                <Text className={`text-base font-bold mb-1 ${darkMode ? 'text-primary-dark' : 'text-primary-light'}`}>Confirmar Nueva Contraseña</Text>
                <View className={`flex-row items-center border-2 rounded-lg px-3 mb-8 ${darkMode ? 'border-primary-dark' : 'border-primary-light'}`}>
                    <Image source={{ uri: icon }} className="w-5 h-5 mr-2" />
                    <TextInput
                        className={`flex-1 py-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}
                        placeholder="NuevaContra"
                        placeholderTextColor={darkMode ? "#07919A99" : "#00808099"}
                        value={confirm}
                        onChangeText={setConfirm}
                        secureTextEntry={!showConfirm}
                    />
                    <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                        <Image
                            source={{
                                uri: showConfirm
                                    ? 'https://img.icons8.com/ios-filled/50/008080/visible--v1.png'
                                    : 'https://img.icons8.com/ios-filled/50/008080/invisible.png'
                            }}
                            className="w-5 h-5 ml-2"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    className={`${darkMode ? 'bg-primary-dark' : 'bg-primary-light'} rounded-lg py-4`}
                    onPress={handleSave}
                    activeOpacity={0.85}
                >
                    <Text className="text-white text-lg font-bold text-center">Guardar Cambios</Text>
                </TouchableOpacity>
            </ScrollView>
            <CustomPopup
                visible={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                title="Error"
                message={popupMessage}
                color="#F76C6C"
                borderColor="#F76C6C"
                buttonText="Volver"
                darkMode={darkMode}
            />
            <CustomPopup
                visible={showSuccessPopup}
                onClose={() => {
                    setShowSuccessPopup(false)
                    navigation.goBack()
                }}
                title="¡Contraseña cambiada!"
                message="La contraseña fue cambiada correctamente."
                color="#008080"
                borderColor="#7AD7F0"
                buttonText="Aceptar"
                darkMode={darkMode}
            />
        </View>
    )
}