import { API_HOST } from '../utils/constants'
import axios from 'axios'

export async function getReservedTimeSlots(professionalId, date) {
    const res = await axios.get(`${API_HOST}timeslots`, {
        params: { professionalId, date }
    })
    return res.data
}

export async function reserveTimeSlot({ professionalId, date, time, userId, token }) {
    const res = await axios.post(
        `${API_HOST}timeslots/reserve`,
        { professionalId, date, time, userId },
        {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
    )
    return res.data
}