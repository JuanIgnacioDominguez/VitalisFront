import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BottomNavbar from '../components/BotomNavbar/BottomNavbar'
import AppointmentCard from '../components/Appointments/AppointmentCard'
import { fetchAppointmentsThunk } from '../Redux/slices/appointmentsSlice'
import AppointmentDetail from '../views/AppointmentsViews/AppointmentDetail'

export default function Appointments({ navigation }) {
    const [tab, setTab] = useState('Pendientes')
    const dispatch = useDispatch()
    const { list: appointments, loading, error } = useSelector(state => state.appointments)

    useEffect(() => {
        dispatch(fetchAppointmentsThunk())
    }, [dispatch])

    // Filtra por estado
    const filteredAppointments = appointments.filter(a =>
        tab === 'Pendientes' ? a.status === 'pending' : a.status === 'completed'
    )

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
                {loading && (
                    <ActivityIndicator size="large" color="#006A71" style={{ marginTop: 40 }} />
                )}
                {!loading && error && (
                    <Text className="text-red-500 text-center mt-10">{error}</Text>
                )}
                {!loading && !error && filteredAppointments.length === 0 && (
                    <View className="flex-1 items-center justify-center mt-10">
                        <View className="bg-primary-light rounded-full w-44 h-44 items-center justify-center mb-8">
                            <Text style={{ fontSize: 90 }} className="text-white">☹️</Text>
                        </View>
                        <Text className="text-primary-light text-3xl font-bold text-center mb-8 leading-7">
                            ¡No hay turnos{'\n'}Agendados!
                        </Text>
                        <TouchableOpacity
                            className="border-2 border-primary-light rounded-xl px-8 py-3"
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text className="text-primary-light text-xl font-bold">Reserva tu turno</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {!loading && !error && filteredAppointments.length > 0 && (
                    filteredAppointments.map(a => (
                        <AppointmentCard
                            key={a.id}
                            doctor={a.doctor}
                            specialty={a.specialty}
                            date={a.date}
                            time={a.time}
                            image={a.image}
                            onPress={() => navigation.navigate('AppointmentDetail', { appointment: a })}
                        />
                    ))
                )}
            </ScrollView>
            <BottomNavbar />
        </View>
    )
}