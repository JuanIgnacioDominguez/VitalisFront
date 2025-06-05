import axios from 'axios'
import { API_HOST } from '../utils/constants'

export async function getFavoritesByUser(userId) {
    const res = await axios.get(`${API_HOST}favorites`)
    return res.data.filter(fav => fav.userId === userId)
}

export async function addFavorite(userId, professionalId) {
    const res = await axios.post(`${API_HOST}favorites`, { userId, professionalId })
    return res.data
}

export async function removeFavorite(favoriteId) {
    await axios.delete(`${API_HOST}favorites/${favoriteId}`)
}