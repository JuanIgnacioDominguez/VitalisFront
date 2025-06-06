import { useState } from 'react'
import { deleteAppointment } from '../../api/appointments'
import { deleteTimeSlot } from '../../api/timeslots'
import { useDispatch } from 'react-redux'
import { fetchAppointmentsThunk } from '../../Redux/slices/appointmentsSlice'

export function useCancelAppointment() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const cancelAppointment = async (appointment, onSuccess, onError) => {
        setLoading(true)
        try {
            await deleteAppointment(appointment.id)
            await deleteTimeSlot({
                professionalId: appointment.professionalId,
                date: appointment.date,
                time: appointment.time
            })
            dispatch(fetchAppointmentsThunk(appointment.userId))
            setLoading(false)
            if (onSuccess) onSuccess()
        } catch (e) {
            setLoading(false)
            if (onError) onError(e)
        }
    }

    return { cancelAppointment, loading }
}