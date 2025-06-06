import axios from 'axios'
import { API_HOST } from '../utils/constants'

export async function fetchTimeSlots(professionalId, date) {
    const res = await axios.get(`${API_HOST}timeslots`, {
        params: { professionalId, date }
    })
    return res.data
}

export async function reserveTimeSlot(slotId, appointmentId) {
    const res = await axios.post(`${API_HOST}timeslots/${slotId}/reserve`, null, {
        params: { appointmentId }
    })
    return res.data
}