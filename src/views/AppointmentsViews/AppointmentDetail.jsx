import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useTheme } from '../../context/ThemeContext'

export default function AppointmentDetail({ route, navigation }) {
    const { appointment } = route.params
    const { darkMode } = useTheme()

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
                <View className="flex-row items-center justify-between px-6 pt-10 pb-2">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
                    </TouchableOpacity>
                    <Text className={`text-2xl font-bold flex-1 text-center mr-8 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                        Detalle del Turno
                    </Text>
                </View>
                <View className="items-center mt-4 mb-6">
                    <Image
                        source={{ uri: appointment.image }}
                        className="w-24 h-24 rounded-full mb-2"
                    />
                    <Text className={`text-lg font-bold text-center mt-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>{appointment.doctor}</Text>
                    <Text className={`text-base ${darkMode ? 'text-secondary-dark' : 'text-secondary-light'}`}>{appointment.specialty}</Text>
                </View>
                <View className="px-6 mb-4">
                    <Text className={`font-bold mb-1 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>Fecha</Text>
                    <Text className={`${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>{appointment.date}</Text>
                    <Text className={`font-bold mb-1 mt-2 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>Hora</Text>
                    <Text className={`${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>{appointment.time}</Text>
                </View>
                <View className="px-6 mb-4">
                    <Text className={`font-bold mb-1 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>Notas del Médico</Text>
                    <Text className={`italic ${darkMode ? 'text-secondary-dark' : 'text-secondary-light'}`}>No hay notas disponibles.</Text>
                </View>
                <View className="px-6 mb-4">
                    <Text className={`font-bold mb-1 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>Resultados de Estudios</Text>
                    <Text className={`italic ${darkMode ? 'text-secondary-dark' : 'text-secondary-light'}`}>No hay imágenes disponibles.</Text>
                </View>
            </ScrollView>
        </View>
    )
}