import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import EditUserInput from '../../components/EditUser/EditUserInput'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowLeftIcon, PencilIcon } from 'react-native-heroicons/outline'
import { updateUserThunk, clearEditUserState } from '../../Redux/slices/EditUserSlice'
import { useTheme } from '../../context/ThemeContext'

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
    const { darkMode } = useTheme()

    useEffect(() => {
        if (success) {
            Alert.alert('Éxito', 'Perfil actualizado correctamente')
            dispatch(clearEditUserState())
            navigation.goBack()
        }
        if (error) {
            Alert.alert('Error', error)
            dispatch(clearEditUserState())
        }
    }, [success, error])

    const handleSave = () => {
        dispatch(updateUserThunk({
            id: user.id,
            data: { nombre, email, dni, obraSocial, nroAfiliado },
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
                        onChangeText={setDni}
                        placeholder="DNI"
                        keyboardType="numeric"
                    />
                    <EditUserInput
                        label="Tipo de Obra Social"
                        value={obraSocial}
                        onChangeText={setObraSocial}
                        placeholder="Osde"
                    />
                    <EditUserInput
                        label="N° de Afiliado"
                        value={nroAfiliado}
                        onChangeText={setNroAfiliado}
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
        </View>
    )
}