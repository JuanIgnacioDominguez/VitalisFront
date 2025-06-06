import axios from 'axios'
import { API_HOST } from '../utils/constants'

export async function fetchAppointments() {
    const res = await axios.get(`${API_HOST}appointments`)
    return res.data
}

export async function createAppointment({ userId, professionalId, date, time }) {
    const res = await axios.post(`${API_HOST}appointments`, {
        userId,
        professionalId,
        date,
        time,
        status: 'pending'
    })
    return res.data
}