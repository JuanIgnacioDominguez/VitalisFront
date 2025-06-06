import React, { useState } from 'react'
import { View } from 'react-native'
import { useUserAppointments } from '../hooks/Appointments/useUserAppointments'
import { useAppointmentsList } from '../hooks/Appointments/useAppointmentsList'
import { useTheme } from '../context/ThemeContext'
import AppointmentsHeader from '../components/Appointments/AppointmentsHeader'
import AppointmentsEmpty from '../components/Appointments/AppointmentsEmpty'
import AppointmentsList from '../components/Appointments/AppointmentsList'
import Spinner from '../components/Appointments/Spinner'
import ErrorMessage from '../components/Appointments/ErrorMessage'

export default function Appointments({ navigation }) {
    const [tab, setTab] = useState('Pendientes')
    const { appointments, loading, error } = useUserAppointments()
    const { darkMode } = useTheme()
    const filteredAppointments = useAppointmentsList(appointments, tab)

    return (
        <View className={`flex-1 ${darkMode ? 'bg-background-dark' : 'bg-background-light'}`}>
            <AppointmentsHeader tab={tab} setTab={setTab} darkMode={darkMode} />
            {loading && <Spinner darkMode={darkMode} />}
            {!loading && error && <ErrorMessage error={error} />}
            {!loading && !error && filteredAppointments.length === 0 && (
                <AppointmentsEmpty navigation={navigation} darkMode={darkMode} />
            )}
            {!loading && !error && filteredAppointments.length > 0 && (
                <AppointmentsList
                    appointments={filteredAppointments}
                    onPressDetail={a => navigation.navigate('AppointmentDetail', { appointment: a })}
                />
            )}
        </View>
    )
}