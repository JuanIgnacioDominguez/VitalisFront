import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeSlots, clearTimeSlots } from '../../Redux/slices/timeSlotsSlice'
import { reserveTimeSlot } from '../../api/timeslots'
import { createAppointment } from '../../api/appointments'
import { getDaysOfMonth, generateTimeSlots } from '../../utils/appointments'

export function useAppointmentScheduler(professional, navigation) {
    const userId = useSelector(state => state.auth.user?.id)
    const token = useSelector(state => state.auth.token)
    const { darkMode } = require('../../context/ThemeContext').useTheme()
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
            await reserveTimeSlot({
                professionalId: professional.id,
                date: selectedDate,
                time: selectedSlot,
                userId,
                token
            })

            await createAppointment({
                userId,
                professionalId: professional.id,
                date: selectedDate,
                time: selectedSlot,
                status: 'pending'
            })

            setBooking(false)
            navigation.navigate('Home')
        } catch (e) {
            setBooking(false)
            alert(e?.response?.data || 'Error al reservar turno')
        }
    }

    const reservedTimes = reservedSlots.map(slot => slot.time)

    return {
        darkMode,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
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
    }
}