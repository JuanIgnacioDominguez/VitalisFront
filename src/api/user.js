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

export async function requestDeleteCode(userId, token) {
    try {
        const response = await axios.post(
            `${API_HOST}users/${userId}/request-delete-code`,
            {},
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data
    } catch (error) {
        throw error.response?.data || { mensaje: error.message || 'Error al solicitar código de eliminación' }
    }
}

export async function deleteUserWithCode(userId, code, token) {
    try {
        const url = `${API_HOST}users/${userId}`;
        const headers = {
            Authorization: token ? `Bearer ${token}` : undefined,
            'Content-Type': 'application/json'
        };
        const params = { code };
        const response = await axios.delete(
            url,
            {
                headers,
                params
            }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || { mensaje: error.message || 'Error al borrar usuario' }
    }
}

export async function updateProfilePicture(userId, imageUri, token) {
    try {
        const formData = new FormData()
        
        const uriParts = imageUri.split('.')
        const fileType = uriParts[uriParts.length - 1]
        
        formData.append('file', {
            uri: imageUri,
            name: `profile.${fileType}`,
            type: `image/${fileType}`
        })

        const response = await axios.put(
            `${API_HOST}users/${userId}/profile-picture`,
            formData,
            {
                headers: {
                    Authorization: token ? `Bearer ${token}` : undefined,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        console.log('Foto actualizada exitosamente:', response.data)
        return response.data
    } catch (error) {
        console.error('Error al actualizar foto de perfil:', error)
        const errorMessage = error.response?.data?.mensaje || error.response?.data?.message || error.message || 'Error al actualizar foto de perfil'
        const errorObj = new Error(errorMessage)
        throw errorObj
    }
}