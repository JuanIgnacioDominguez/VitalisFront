import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppointmentsThunk } from '../../Redux/slices/appointmentsSlice'

export function useUserAppointments() {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.user?.id)
    const { list: appointments, loading, error } = useSelector(state => state.appointments)

    useEffect(() => {
        if (userId) dispatch(fetchAppointmentsThunk(userId))
    }, [dispatch, userId])

    return { appointments, loading, error }
} 