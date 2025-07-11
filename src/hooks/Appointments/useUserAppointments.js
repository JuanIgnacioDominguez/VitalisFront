import { useSelector } from 'react-redux'

export function useUserAppointments() {
    const { list: appointments, loading, error } = useSelector(state => state.appointments)
    
    return { appointments, loading, error }
}