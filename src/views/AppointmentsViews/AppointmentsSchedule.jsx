import React, { useState } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import HeaderSection from '../../components/AppointmentsSchedule/HeaderSection'
import ProfessionalHeader from '../../components/AppointmentsSchedule/ProfessionalHeader'
import MonthSelector from '../../components/AppointmentsSchedule/MonthSelector'
import DaySelector from '../../components/AppointmentsSchedule/DaySelector'
import TimeSlots from '../../components/AppointmentsSchedule/TimeSlots'
import BookButton from '../../components/AppointmentsSchedule/BookButton'
import CustomPopup from '../../components/PopUps/CustomPopup'
import { useAppointmentScheduler } from '../../hooks/Appointments/UseAppointmentScheduler'

const MONTHS_ES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

export default function AppointmentsSchedule({ route, navigation }) {
    const { professional } = route.params
    const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [showObraSocialPopup, setShowObraSocialPopup] = useState(false)
    const user = useSelector(state => state.auth.user)
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
        handleBook: originalHandleBook
    } = useAppointmentScheduler(professional, navigation)

    const handleBook = async () => {
        if (
            !user?.obraSocial ||
            !user?.nroAfiliado ||
            user.obraSocial.trim() === '' ||
            user.nroAfiliado.trim() === ''
        ) {
            setShowObraSocialPopup(true)
            setTimeout(() => {
                setShowObraSocialPopup(false)
                navigation.navigate('EditUser')
            }, 2000)
            return
        }

        try {
            const result = await originalHandleBook()
            if (result !== false) { 
                setShowSuccessPopup(true)
                setTimeout(() => {
                    setShowSuccessPopup(false)
                    navigation.navigate('MainTabs', { screen: 'Appointments' })
                }, 2000)
            }
        } catch (e) {
            const msg = e?.response?.data || ''
            alert(msg || 'No se pudo reservar el turno. Verifica tus datos.')
        }
    }

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
            <View className="mt-0 mb-2 px-2">
                <DaySelector
                    daysOfMonth={daysOfMonth}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    darkMode={darkMode}
                />
            </View>
            <View className="flex-1 px-2 py-2">
                <TimeSlots
                    allTimeSlots={allTimeSlots}
                    reservedTimes={reservedTimes}
                    selectedSlot={selectedSlot}
                    setSelectedSlot={setSelectedSlot}
                    darkMode={darkMode}
                    loading={loading}
                />
            </View>
            <View className="px-4 pb-6 pt-2 bg-transparent">
                <BookButton
                    onPress={handleBook}
                    disabled={!selectedSlot || booking}
                    booking={booking}
                    darkMode={darkMode}
                    selectedSlot={selectedSlot}
                />
            </View>
            <CustomPopup
                visible={showSuccessPopup}
                onClose={() => setShowSuccessPopup(false)}
                title="¡Turno reservado!"
                message="Tu turno fue reservado con éxito."
                color="#008080"
                borderColor="#7AD7F0"
                buttonText={null}
            />
            <CustomPopup
                visible={showObraSocialPopup}
                onClose={() => setShowObraSocialPopup(false)}
                title="Necesitas vincular tu obra social"
                message="Debes cargar tu obra social y número de afiliado para sacar un turno."
                color="#F76C6C"
                borderColor="#F76C6C"
                buttonText={null}
            />
        </View>
    )
}