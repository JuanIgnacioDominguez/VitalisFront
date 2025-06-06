import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import EditUserInput from '../../components/EditUser/EditUserInput'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowLeftIcon, PencilIcon } from 'react-native-heroicons/outline'
import { updateUserThunk, clearEditUserState } from '../../Redux/slices/EditUserSlice'
import { useTheme } from '../../context/ThemeContext'
import CustomPopup from '../../components/PopUps/CustomPopup'
import { Picker } from '@react-native-picker/picker'
import { setUser } from '../../api/auth' 


const obrasSociales = [
    "OSDE", "Swiss Medical", "Galeno", "Medicus", "Omint",
    "Sancor Salud", "Federada Salud", "Accord Salud", "OSPACA", "OSPAT"
]


export default function EditUser({ navigation }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.auth.token)
    const { loading, error, success } = useSelector(state => state.editUser)
    const [nombre, setNombre] = useState(user?.nombre || '')
    const [email, setEmail] = useState(user?.email || '')
    const [dni, setDni] = useState(user?.dni || '')
    const [obraSocial, setObraSocial] = useState(user?.obraSocial || '')
    const [nroAfiliado, setNroAfiliado] = useState(user?.nroAfiliado || '')
    const [telefono, setTelefono] = useState(user?.telefono || '')
    const { darkMode } = useTheme()
    const [showErrorPopup, setShowErrorPopup] = useState(false)
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')

    useEffect(() => {
        if (success) {
            setShowSuccessPopup(true)
            dispatch(setUser({ nombre, email, dni, obraSocial, nroAfiliado, telefono }))
            dispatch(clearEditUserState())
        }
        if (error) {
            setPopupMessage(error)
            setShowErrorPopup(true)
            dispatch(clearEditUserState())
        }
    }, [success, error])

    const handleSave = () => {
        if (!nombre || !email || !dni || !obraSocial || !nroAfiliado || !telefono) {
            setPopupMessage('Completa todos los campos obligatorios')
            setShowErrorPopup(true)
            return
        }
        if (dni.length !== 8) {
            setPopupMessage('El DNI debe tener 8 dígitos')
            setShowErrorPopup(true)
            return
        }
        if (nroAfiliado.length !== 10) {
            setPopupMessage('El N° de Afiliado debe tener 10 dígitos')
            setShowErrorPopup(true)
            return
        }
        if (telefono.length !== 10) {
            setPopupMessage('El número de teléfono debe tener 10 dígitos')
            setShowErrorPopup(true)
            return
        }
        if (!obrasSociales.includes(obraSocial)) {
            setPopupMessage('Selecciona una obra social válida')
            setShowErrorPopup(true)
            return
        }
        dispatch(updateUserThunk({
            id: user.id,
            data: { nombre, email, dni, obraSocial, nroAfiliado, telefono },
            token
        }))
    }

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
                <View className="flex-row items-center justify-between px-6 pt-10 pb-2">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
                    </TouchableOpacity>
                    <Text className={`text-2xl font-bold flex-1 text-center mr-8 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                        Editar Perfil
                    </Text>
                </View>

                <View className="items-center mt-2 mb-4">
                    <View className="relative">
                        <Image
                            source={{ uri: user?.foto || 'https://randomuser.me/api/portraits/men/1.jpg' }}
                            className="w-24 h-24 rounded-full mb-2"
                        />
                        <TouchableOpacity
                            className={`${darkMode ? 'bg-primary-dark' : 'bg-primary-light'} absolute bottom-2 right-2 rounded-full p-1`}
                            onPress={() => {}}
                        >
                            <PencilIcon size={18} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <Text className={`text-lg font-bold text-center mt-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>{nombre}</Text>
                </View>

                <View className="px-6">
                    <EditUserInput
                        label="Nombre"
                        value={nombre}
                        onChangeText={setNombre}
                        placeholder="Nombre Completo"
                    />
                    <EditUserInput
                        label="Correo Electronico"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="ejemplo@mail.com"
                        keyboardType="email-address"
                    />
                    <EditUserInput
                        label="DNI"
                        value={dni}
                        onChangeText={text => {
                            const filtered = text.replace(/[^0-9]/g, '').slice(0, 8)
                            setDni(filtered)
                        }}
                        placeholder="DNI"
                        keyboardType="numeric"
                    />
                    <EditUserInput
                        label="Teléfono"
                        value={telefono}
                        onChangeText={text => {
                            const filtered = text.replace(/[^0-9]/g, '').slice(0, 10)
                            setTelefono(filtered)
                        }}
                        placeholder="Ej: 1123456789"
                        keyboardType="numeric"
                    />
                    <View style={{ marginBottom: 16 }}>
                        <Text className="text-base font-bold mb-1">Tipo de Obra Social</Text>
                        <View className="border-2 border-primary-light rounded-lg bg-background-light">
                            <Picker
                                selectedValue={obraSocial}
                                onValueChange={setObraSocial}
                                style={{ color: darkMode ? '#fff' : '#008080' }}
                            >
                                <Picker.Item label="Seleccionar obra social" value="" />
                                {obrasSociales.map(os => (
                                    <Picker.Item key={os} label={os} value={os} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <EditUserInput
                        label="N° de Afiliado"
                        value={nroAfiliado}
                        onChangeText={text => {
                            const filtered = text.replace(/[^0-9]/g, '').slice(0, 10)
                            setNroAfiliado(filtered)
                        }}
                        placeholder="10938402"
                        keyboardType="numeric"
                    />
                </View>

                <View className="px-6 mt-6">
                    <TouchableOpacity
                        className={`${darkMode ? 'bg-primary-dark' : 'bg-primary-light'} rounded-xl py-4`}
                        onPress={handleSave}
                        activeOpacity={0.85}
                        disabled={loading}
                    >
                        <Text className="text-white text-lg font-bold text-center">
                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <CustomPopup
                visible={showErrorPopup}
                onClose={() => setShowErrorPopup(false)}
                title="Error"
                message={popupMessage || "No se pudieron realizar los cambios"}
                color="#F76C6C"
                borderColor="#F76C6C"
                buttonText="Volver"
            />
            <CustomPopup
                visible={showSuccessPopup}
                onClose={() => {
                    setShowSuccessPopup(false)
                    navigation.goBack()
                }}
                title="¡Cambios guardados!"
                message="Los cambios se realizaron correctamente."
                color="#008080"
                borderColor="#7AD7F0"
                buttonText="Volver"
            />
        </View>
    )
}