import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'

export default function AppointmentDetail({ route, navigation }) {
    const { appointment } = route.params

    return (
        <View className="flex-1 bg-background-light">
            <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
                <View className="flex-row items-center justify-between px-6 pt-10 pb-2">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon size={28} color="#006A71" />
                    </TouchableOpacity>
                    <Text className="text-primary-light text-2xl font-bold flex-1 text-center mr-8">
                        Detalle del Turno
                    </Text>
                </View>
                <View className="items-center mt-4 mb-6">
                    <Image
                        source={{ uri: appointment.image }}
                        className="w-24 h-24 rounded-full mb-2"
                    />
                    <Text className="text-lg font-bold text-center mt-2">{appointment.doctor}</Text>
                    <Text className="text-secondary-light text-base">{appointment.specialty}</Text>
                </View>
                <View className="px-6 mb-4">
                    <Text className="text-primary-light font-bold mb-1">Fecha</Text>
                    <Text className="mb-2">{appointment.date}</Text>
                    <Text className="text-primary-light font-bold mb-1">Hora</Text>
                    <Text className="mb-2">{appointment.time}</Text>
                </View>
                <View className="px-6 mb-4">
                    <Text className="text-primary-light font-bold mb-1">Notas del Médico</Text>
                    <Text className="mb-2 italic text-secondary-light">No hay notas disponibles.</Text>
                </View>
                <View className="px-6 mb-4">
                    <Text className="text-primary-light font-bold mb-1">Resultados de Estudios</Text>
                    <Text className="mb-2 italic text-secondary-light">No hay imágenes disponibles.</Text>
                </View>
            </ScrollView>
        </View>
    )
}