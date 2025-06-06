import axios from 'axios'
import { API_HOST } from '../utils/constants'

export async function getReservedTimeSlots(professionalId, date) {
    const res = await axios.get(`${API_HOST}timeslots`, {
        params: { professionalId, date }
    })
    return res.data
}

export async function reserveTimeSlot({ professionalId, date, time, userId }) {
    const res = await axios.post(`${API_HOST}timeslots/reserve`, {
        professionalId, date, time, userId
    })
    return res.data
}