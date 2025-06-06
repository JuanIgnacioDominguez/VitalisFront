import axios from 'axios'
import { API_HOST } from '../utils/constants'

export async function createAppointment({ userId, professionalId, date, time, status }) {
    const res = await axios.post(`${API_HOST}appointments`, {
        userId,
        professionalId,
        date,
        time,
        status
    })
    return res.data
}

export async function deleteAppointment(appointmentId) {
    return axios.delete(`${API_HOST}appointments/${appointmentId}`)
}