import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { useUserAppointments } from '../hooks/Appointments/useUserAppointments'
import { useAppointmentsList } from '../hooks/Appointments/useAppointmentsList'
import { useTheme } from '../context/ThemeContext'
import AppointmentsHeader from '../components/Appointments/AppointmentsHeader'
import AppointmentsEmpty from '../components/Appointments/AppointmentsEmpty'
import AppointmentsList from '../components/Appointments/AppointmentsList'
import Spinner from '../components/Appointments/Spinner'
import ErrorMessage from '../components/Appointments/ErrorMessage'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppointmentsThunk } from '../Redux/slices/appointmentsSlice'

export default function Appointments({ navigation }) {
    const [tab, setTab] = useState('Pendientes')
    const { appointments, loading, error } = useUserAppointments()
    const { darkMode } = useTheme()
    const filteredAppointments = useAppointmentsList(appointments, tab)

    // NUEVO: refrescar al volver a la pantalla
    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.user?.id)

    useEffect(() => {
        if (isFocused && userId) {
            dispatch(fetchAppointmentsThunk(userId))
        }
    }, [isFocused, userId, dispatch])

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