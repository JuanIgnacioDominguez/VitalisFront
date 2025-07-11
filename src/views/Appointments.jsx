import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { useUserAppointments } from '../hooks/Appointments/useUserAppointments'
import { useAppointmentsList } from '../hooks/Appointments/useAppointmentsList'
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from '../hooks/useTranslation'
import AppointmentsHeader from '../components/Appointments/AppointmentsHeader'
import AppointmentsEmpty from '../components/Appointments/AppointmentsEmpty'
import AppointmentsList from '../components/Appointments/AppointmentsList'
import Spinner from '../components/Appointments/Spinner'
import ErrorMessage from '../components/Appointments/ErrorMessage'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppointmentsThunk, updateExpiredAppointments } from '../Redux/slices/appointmentsSlice'

export default function Appointments({ navigation }) {
    const { t } = useTranslation()
    const [tab, setTab] = useState(t('pending'))
    const { appointments, loading, error } = useUserAppointments()
    const { darkMode } = useTheme()
    const filteredAppointments = useAppointmentsList(appointments, tab)

    const isFocused = useIsFocused()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.user?.id)
    const token = useSelector(state => state.auth.token)

    useEffect(() => {
        if (isFocused && userId && token) {
            dispatch(updateExpiredAppointments({ userId, token }))
                .then(() => {
                    dispatch(fetchAppointmentsThunk({ userId, token }))
                })
        }
    }, [isFocused, userId, token, dispatch])

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(updateExpiredAppointments({ userId, token }))
        }, 300000) 

        return () => clearInterval(interval)
    }, [dispatch, userId, token])

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