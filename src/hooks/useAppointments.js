import { useSelector } from 'react-redux'

export default function useAppointments() {
    return useSelector(state => state.appointments.list)
}