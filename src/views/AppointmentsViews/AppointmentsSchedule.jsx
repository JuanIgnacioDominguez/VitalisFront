import React from 'react'
import { View } from 'react-native'
import HeaderSection from '../../components/AppointmentsSchedule/HeaderSection'
import ProfessionalHeader from '../../components/AppointmentsSchedule/ProfessionalHeader'
import MonthSelector from '../../components/AppointmentsSchedule/MonthSelector'
import DaySelector from '../../components/AppointmentsSchedule/DaySelector'
import TimeSlots from '../../components/AppointmentsSchedule/TimeSlots'
import BookButton from '../../components/AppointmentsSchedule/BookButton'
import { useAppointmentScheduler } from '../../hooks/Appointments/UseAppointmentScheduler'

const MONTHS_ES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export default function AppointmentsSchedule({ route, navigation }) {
    const { professional } = route.params
    const {
        darkMode,
        selectedMonth,
        selectedYear,
        daysOfMonth,
        selectedDate,
        setSelectedDate,
        allTimeSlots,
        reservedTimes,
        selectedSlot,
        setSelectedSlot,
        booking,
        loading,
        handlePrevMonth,
        handleNextMonth,
        handleBook
    } = useAppointmentScheduler(professional, navigation)

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <HeaderSection navigation={navigation} darkMode={darkMode} />
            <ProfessionalHeader professional={professional} darkMode={darkMode} />
            <MonthSelector
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                MONTHS_ES={MONTHS_ES}
                darkMode={darkMode}
                handlePrevMonth={handlePrevMonth}
                handleNextMonth={handleNextMonth}
                today={new Date()}
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