import axios from 'axios'
import { API_HOST } from '../utils/constants'

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

export async function deleteTimeSlot({ professionalId, date, time, token }) {
    try {
        console.log('Intentando borrar timeslot:', { professionalId, date, time })
        const res = await axios.get(`${API_HOST}timeslots`, {
            params: { professionalId, date }
        })
        console.log('Timeslots encontrados:', res.data)
        const slot = res.data.find(s => s.time === time)
        if (!slot) {
            console.log('No se encontró el timeslot para borrar')
            throw new Error('No se encontró el timeslot para borrar')
        }
        await axios.delete(`${API_HOST}timeslots/${slot.id}`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
        console.log('Timeslot borrado:', slot.id)
    } catch (e) {
        console.log('Error al borrar timeslot:', e)
        throw e
    }
}