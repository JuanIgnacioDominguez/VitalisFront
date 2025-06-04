import axios from 'axios'
import { API_HOST } from '../utils/constants'

export async function fetchAppointments() {
    const res = await axios.get(`${API_HOST}appointments`)
    return res.data
}