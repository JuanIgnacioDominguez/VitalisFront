import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeSlots, clearTimeSlots } from '../../Redux/slices/timeSlotsSlice'
import { reserveTimeSlot } from '../../api/timeslots'
import { createAppointment } from '../../api/appointments'
import { ArrowLeftIcon } from 'react-native-heroicons/outline'
import { useTheme } from '../../context/ThemeContext'

import ProfessionalHeader from '../../components/AppointmentsSchedule/ProfessionalHeader'
import MonthSelector from '../../components/AppointmentsSchedule/MonthSelector'
import DaySelector from '../../components/AppointmentsSchedule/DaySelector'
import TimeSlots from '../../components/AppointmentsSchedule/TimeSlots'
import BookButton from '../../components/AppointmentsSchedule/BookButton'

const MONTHS_ES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

function getDaysOfMonth(year, month) {
    const days = []
    const today = new Date()
    const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())
    const startDay = (year === today.getFullYear() && month === today.getMonth()) ? today.getDate() : 1
    const lastDay = new Date(year, month + 1, 0).getDate()
    for (let d = startDay; d <= lastDay; d++) {
        const date = new Date(year, month, d)
        if (date < minDate || date > maxDate) continue
        days.push({
            label: date.toLocaleDateString('es-AR', { weekday: 'short' }),
            day: d,
            value: date.toISOString().slice(0, 10),
            isToday: date.toDateString() === today.toDateString()
        })
    }
    return days
}

function generateTimeSlots() {
    const slots = []
    for (let hour = 9; hour < 18; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`)
        slots.push(`${hour.toString().padStart(2, '0')}:30`)
    }
    slots.push('18:00')
    return slots
}

export default function AppointmentsSchedule({ route, navigation }) {
    const { professional } = route.params
    const userId = useSelector(state => state.auth.user?.id)
    const { darkMode } = useTheme()
    const dispatch = useDispatch()
    const { list: reservedSlots, loading } = useSelector(state => state.timeSlots)

    const today = new Date()
    const [selectedMonth, setSelectedMonth] = useState(today.getMonth())
    const [selectedYear, setSelectedYear] = useState(today.getFullYear())
    const initialDate = (() => {
        const d = new Date(today)
        d.setDate(d.getDate() + 1)
        return d.toISOString().slice(0, 10)
    })()
    const [selectedDate, setSelectedDate] = useState(initialDate)
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [booking, setBooking] = useState(false)

    const daysOfMonth = getDaysOfMonth(selectedYear, selectedMonth)
    const allTimeSlots = generateTimeSlots()

    useEffect(() => {
        dispatch(getTimeSlots({ professionalId: professional.id, date: selectedDate }))
        setSelectedSlot(null)
        return () => dispatch(clearTimeSlots())
    }, [selectedDate, professional.id, dispatch])

    const handlePrevMonth = () => {
        const minMonth = today.getMonth()
        const minYear = today.getFullYear()
        if (selectedYear < minYear || (selectedYear === minYear && selectedMonth <= minMonth)) return
        if (selectedMonth === 0) {
            setSelectedMonth(11)
            setSelectedYear(selectedYear - 1)
        } else {
            setSelectedMonth(selectedMonth - 1)
        }
    }
    const handleNextMonth = () => {
        const maxDate = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate())
        const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1
        const nextYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear
        const testDate = new Date(nextYear, nextMonth, 1)
        if (testDate > maxDate) return
        if (selectedMonth === 11) {
            setSelectedMonth(0)
            setSelectedYear(selectedYear + 1)
        } else {
            setSelectedMonth(selectedMonth + 1)
        }
    }

    const handleBook = async () => {
        if (!selectedSlot) return
        setBooking(true)
        try {
            // 1. Reservar el horario
            await reserveTimeSlot({
                professionalId: professional.id,
                date: selectedDate,
                time: selectedSlot,
                userId
            })
            // 2. Crear el Appointment
            await createAppointment({
                userId,
                professionalId: professional.id,
                date: selectedDate,
                time: selectedSlot,
                status: 'pending'
            })
            setBooking(false)
            navigation.navigate('Appointments')
        } catch (e) {
            setBooking(false)
            alert(e?.response?.data || 'Error al reservar turno')
        }
    }

    const reservedTimes = reservedSlots.map(slot => slot.time)

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
            <ProfessionalHeader professional={professional} darkMode={darkMode} />
            <MonthSelector
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                MONTHS_ES={MONTHS_ES}
                darkMode={darkMode}
                handlePrevMonth={handlePrevMonth}
                handleNextMonth={handleNextMonth}
                today={today}
            />
            <DaySelector
                daysOfMonth={daysOfMonth}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                darkMode={darkMode}
            />
            <TimeSlots
                allTimeSlots={allTimeSlots}
                reservedTimes={reservedTimes}
                selectedSlot={selectedSlot}
                setSelectedSlot={setSelectedSlot}
                darkMode={darkMode}
                loading={loading}
            />
            <BookButton
                onPress={handleBook}
                disabled={!selectedSlot || booking}
                booking={booking}
                darkMode={darkMode}
                selectedSlot={selectedSlot}
            />
        </View>
    )
}