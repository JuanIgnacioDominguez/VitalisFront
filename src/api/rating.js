import axios from 'axios'
import { API_HOST } from '../utils/constants'

export const createAppRating = async (ratingData, token) => {
    try {
        const response = await axios.post(
            `${API_HOST}app-ratings`,
            ratingData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data
    } catch (error) {
        if (error.response?.data) {
            throw new Error(error.response.data.message || 'Error al enviar la calificación')
        }
        throw new Error('Error de conexión')
    }
}

export const getMyRating = async (token) => {
    try {
        const response = await axios.get(
            `${API_HOST}app-ratings/my-rating`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        if (error.response?.data) {
            throw new Error(error.response.data.message || 'Error al obtener la calificación')
        }
        throw new Error('Error de conexión')
    }
}

export const hasUserRated = async (token) => {
    try {
        const response = await axios.get(
            `${API_HOST}app-ratings/has-rated`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data.hasRated
    } catch (error) {
        if (error.response?.data) {
            throw new Error(error.response.data.message || 'Error al verificar calificación')
        }
        throw new Error('Error de conexión')
    }
}
