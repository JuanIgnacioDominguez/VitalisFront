import axios from 'axios'
import { API_HOST } from '../utils/constants'

export async function updateUser(id, data, token) {
    try {
        const response = await axios.put(
            `${API_HOST}users/${id}`,
            data,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data
    } catch (error) {
        console.log('Error al actualizar usuario:', error.response?.data || error.message || error)
        throw error.response?.data || { mensaje: error.message || 'Error al actualizar usuario' }
    }
}