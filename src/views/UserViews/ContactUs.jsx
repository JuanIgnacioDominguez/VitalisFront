import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import BottomNavbar from '../../components/BotomNavbar/BottomNavbar'
import { sendContactMessage } from '../../api/user'
import { useSelector } from 'react-redux' 
import { API_HOST } from '../../utils/constants'

export default function ContactUs({ navigation }) {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.auth.token)

    const handleSend = async () => {
        if (!nombre || !email || !mensaje) {
            Alert.alert('Error', 'Completa todos los campos')
            return
        }
        setLoading(true)
        try {
            await sendContactMessage({ nombre, email, mensaje, token }) 
            Alert.alert('¡Enviado!', 'Tu mensaje fue enviado correctamente')
            setNombre('')
            setEmail('')
            setMensaje('')
        } catch (e) {
            Alert.alert('Error', 'No se pudo enviar el mensaje')
        }
        setLoading(false)
    }

    return (
        <View className="flex-1 bg-background-light">
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
                <View className="flex-row items-center mt-12 mb-6 px-6">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={28} color="#006A71" />
                    </TouchableOpacity>
                    <Text className="text-primary-light text-2xl font-bold flex-1 text-center mr-8">
                        Contactanos
                    </Text>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View className="px-6">
                        <TextInput
                            className="border-2 border-primary-light rounded-lg px-4 py-3 mb-4 bg-background-light text-primary-light"
                            placeholder="Nombre"
                            placeholderTextColor="#00808099"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            className="border-2 border-primary-light rounded-lg px-4 py-3 mb-4 bg-background-light text-primary-light"
                            placeholder="ejemplo@mail.com"
                            placeholderTextColor="#00808099"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            className="border-2 border-primary-light rounded-lg px-4 py-3 mb-8 bg-background-light text-primary-light"
                            placeholder="Cuéntanos lo que quieras"
                            placeholderTextColor="#00808099"
                            value={mensaje}
                            onChangeText={setMensaje}
                            multiline
                            numberOfLines={5}
                            style={{ minHeight: 100, textAlignVertical: 'top' }}
                        />
                        <TouchableOpacity
                            className="bg-primary-light rounded-lg py-3"
                            onPress={handleSend}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            <Text className="text-white text-lg font-bold text-center">
                                {loading ? 'Enviando...' : 'Enviar'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            <BottomNavbar />
        </View>
    )
}