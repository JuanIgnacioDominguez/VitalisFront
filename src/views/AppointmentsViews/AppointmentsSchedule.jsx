import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeSlots, clearTimeSlots } from '../../Redux/slices/timeSlotsSlice'
import { createAppointment } from '../../api/appointments'
import { reserveTimeSlot } from '../../api/timeslots'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useTheme } from '../../context/ThemeContext'

function getNext7Days() {
    const days = []
    const options = { weekday: 'short', day: '2-digit', month: '2-digit' }
    for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(date.getDate() + i)
        days.push({
            label: date.toLocaleDateString('es-AR', options),
            value: date.toISOString().slice(0, 10)
        })
    }
    return days
}

export default function AppointmentsSchedule({ route, navigation }) {
    const { professional } = route.params
    const userId = useSelector(state => state.auth.user?.id)
    const { darkMode } = useTheme()
    const dispatch = useDispatch()
    const { list: timeSlots, loading, error } = useSelector(state => state.timeSlots)
    const [selectedDate, setSelectedDate] = useState(getNext7Days()[0].value)
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [booking, setBooking] = useState(false)

    useEffect(() => {
        dispatch(getTimeSlots({ professionalId: professional.id, date: selectedDate }))
        return () => dispatch(clearTimeSlots())
    }, [selectedDate, professional.id, dispatch])

    const handleBook = async () => {
        if (!selectedSlot) return
        setBooking(true)
        try {
            // 1. Crear turno
            const appointment = await createAppointment({
                userId,
                professionalId: professional.id,
                date: selectedDate,
                time: selectedSlot.time
            })
            // 2. Reservar slot
            await reserveTimeSlot(selectedSlot.id, appointment.id)
            setBooking(false)
            navigation.navigate('Appointments')
        } catch (e) {
            setBooking(false)
            alert('Error al reservar turno')
        }
    }

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <View className="flex-row items-center px-6 pt-10 pb-2">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeftIcon size={28} color={darkMode ? "#07919A" : "#006A71"} />
                </TouchableOpacity>
                <Text className={`text-2xl font-bold flex-1 text-center mr-8 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>
                    Agendar turno
                </Text>
            </View>
            <View className="items-center mt-4 mb-2">
                <Image
                    source={
                        professional.imagen
                            ? { uri: `data:image/jpeg;base64,${professional.imagen}` }
                            : { uri: 'https://ui-avatars.com/api/?name=Doctor' }
                    }
                    className="w-24 h-24 rounded-full mb-2"
                />
                <Text className={`text-xl font-bold ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>{professional.name}</Text>
                <Text className={`text-base ${darkMode ? 'text-secondary-dark' : 'text-secondary-light'}`}>{professional.specialty}</Text>
            </View>
            <Text className={`text-lg font-bold px-6 mt-2 mb-1 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>Selecciona el día</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-2">
                {getNext7Days().map(day => (
                    <TouchableOpacity
                        key={day.value}
                        className={`px-4 py-2 rounded-xl mx-1 ${selectedDate === day.value
                            ? (darkMode ? 'bg-primary-dark' : 'bg-primary-light')
                            : (darkMode ? 'bg-components-dark' : 'bg-components-light')}`}
                        onPress={() => setSelectedDate(day.value)}
                    >
                        <Text className={`font-bold ${selectedDate === day.value
                            ? 'text-white'
                            : (darkMode ? 'text-primary-dark' : 'text-primary-light')}`}>
                            {day.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Text className={`text-lg font-bold px-6 mt-2 mb-1 ${darkMode ? 'text-text-dark' : 'text-primary-light'}`}>Horarios disponibles</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-4">
                {loading ? (
                    <ActivityIndicator size="small" color="#006A71" style={{ marginTop: 10 }} />
                ) : error ? (
                    <Text className="text-red-500 mt-4">{error}</Text>
                ) : timeSlots.length === 0 ? (
                    <Text className="text-primary-light mt-4">No hay horarios disponibles</Text>
                ) : (
                    timeSlots
                        .filter(slot => slot.status === 'AVAILABLE')
                        .map(slot => (
                            <TouchableOpacity
                                key={slot.id}
                                className={`px-5 py-3 rounded-xl mx-1 mb-2 border-2 ${selectedSlot?.id === slot.id
                                    ? (darkMode ? 'border-primary-dark bg-primary-dark' : 'border-primary-light bg-primary-light')
                                    : (darkMode ? 'border-components-dark bg-components-dark' : 'border-components-light bg-components-light')}`}
                                onPress={() => setSelectedSlot(slot)}
                            >
                                <Text className={`font-bold text-base ${selectedSlot?.id === slot.id
                                    ? 'text-white'
                                    : (darkMode ? 'text-primary-dark' : 'text-primary-light')}`}>
                                    {slot.time}
                                </Text>
                            </TouchableOpacity>
                        ))
                )}
            </ScrollView>
            <TouchableOpacity
                className={`mx-6 mt-2 py-4 rounded-xl ${selectedSlot
                    ? (darkMode ? 'bg-primary-dark' : 'bg-primary-light')
                    : 'bg-gray-400'}`}
                disabled={!selectedSlot || booking}
                onPress={handleBook}
                activeOpacity={0.85}
            >
                <Text className="text-white text-lg font-bold text-center">
                    {booking ? 'Reservando...' : 'Reservar turno'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}