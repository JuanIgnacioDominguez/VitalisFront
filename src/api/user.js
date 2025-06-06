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

export async function sendContactMessage(data, token) {
    try {
        const response = await axios.post(
            `${API_HOST}users/contact`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            }
        )
        return response.data
    } catch (error) {
        console.log('Error al enviar mensaje de contacto:', error.response?.data || error.message || error)
        throw error.response?.data || { mensaje: error.message || 'Error al enviar mensaje de contacto' }
    }
}

export async function changePassword(userId, currentPassword, newPassword, token) {
    try {
        const response = await axios.put(
            `${API_HOST}users/${userId}/password`,
            { actual: currentPassword, nueva: newPassword },
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log('[changePassword] Response:', response.data)
        return response.data
    } catch (error) {
        throw error.response?.data || { mensaje: error.message || 'Error al cambiar contraseña' }
    }
}