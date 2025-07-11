import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppointmentsThunk, updateExpiredAppointments } from '../../Redux/slices/appointmentsSlice'

export function useUserAppointments() {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.user?.id)
    const token = useSelector(state => state.auth.token)
    const { list: appointments, loading, error } = useSelector(state => state.appointments)

    useEffect(() => {
        if (userId && token) {
            dispatch(updateExpiredAppointments({ userId, token }))
                .then(() => {
                    dispatch(fetchAppointmentsThunk({ userId, token }))
                })
        }
    }, [dispatch, userId, token])

    return { appointments, loading, error }
}