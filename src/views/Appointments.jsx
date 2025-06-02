import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import BottomNavbar from '../components/BotomNavbar/BottomNavbar'
import AppointmentCard from '../components/Appointments/AppointmentCard'

const exampleAppointments = [
    {
        id: 1,
        doctor: 'Dr. Martín Pérez',
        specialty: 'Pediatra',
        date: 'Lunes, 12 de Abril',
        time: '10:00 AM',
        image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
        id: 2,
        doctor: 'Dr. Pablo Giardina',
        specialty: 'Neurólogo',
        date: 'Martes, 13 de Abril',
        time: '11:00 AM',
        image: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    {
        id: 3,
        doctor: 'Dr. Pablito Lescano',
        specialty: 'Pediatra',
        date: 'Jueves, 16 de Abril',
        time: '15:00 PM',
        image: 'https://randomuser.me/api/portraits/men/65.jpg'
    },
    {
        id: 4,
        doctor: 'Dr. Mateo Sanchez',
        specialty: 'Ginecólogo',
        date: 'Viernes, 18 de Abril',
        time: '09:00 AM',
        image: 'https://randomuser.me/api/portraits/men/12.jpg'
    }
]

export default function Appointments({ navigation }) {
    const [tab, setTab] = useState('Pendientes')
    // Simulación: todos los turnos son pendientes, puedes filtrar por estado real si lo tienes
    const filteredAppointments = tab === 'Pendientes' ? exampleAppointments : []

    return (
        <View className="flex-1 bg-background-light">
        <View className="pt-12 pb-4 px-6">
            <Text className="text-primary-light text-2xl font-bold text-center mb-7">Vista de Turnos</Text>
            <View className="flex-row justify-center mb-7">
            <TouchableOpacity
                className={`flex-1 mr-2 py-2 rounded-full border-2 ${tab === 'Pendientes' ? 'bg-primary-light border-primary-light' : 'border-primary-light bg-transparent'}`}
                onPress={() => setTab('Pendientes')}
                activeOpacity={0.8}
            >
                <Text className={`text-base font-semibold text-center ${tab === 'Pendientes' ? 'text-white' : 'text-primary-light'}`}>Pendientes</Text>
            </TouchableOpacity>
            <TouchableOpacity
                className={`flex-1 py-2 rounded-full border-2 ${tab === 'Completados' ? 'bg-primary-light border-primary-light' : 'border-primary-light bg-transparent'}`}
                onPress={() => setTab('Completados')}
                activeOpacity={0.8}
            >
                <Text className={`text-base font-semibold text-center ${tab === 'Completados' ? 'text-white' : 'text-primary-light'}`}>Completados</Text>
            </TouchableOpacity>
            </View>
        </View>

        <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 90 }}>
            {filteredAppointments.length === 0 ? (
            <View className="flex-1 items-center justify-center mt-16">
                <Text className="text-[90px] text-primary-light mb-6">☹️</Text>
                <Text className="text-primary-light text-2xl font-bold text-center mb-8 leading-7">¡No hay turnos{'\n'}Agendados!</Text>
                <TouchableOpacity
                className="border-2 border-primary-light rounded-lg px-8 py-3"
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Home')}
                >
                <Text className="text-primary-light text-lg font-bold">Reserva tu turno</Text>
                </TouchableOpacity>
            </View>
            ) : (
            filteredAppointments.map(a => (
                <AppointmentCard
                key={a.id}
                {...a}
                onPress={() => {/* Acción al ver detalles */}}
                />
            ))
            )}
        </ScrollView>
        <BottomNavbar />
        </View>
    )
}