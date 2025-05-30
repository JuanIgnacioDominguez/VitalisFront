import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_HOST } from '../utils/constants'

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_HOST}auth/register`, userData)
            console.log(userData)
            return response.data
        } catch (error) {
            if (error.response) {
                // Intenta obtener el mensaje del backend, si existe
                const mensaje = error.response.data?.mensaje || 'Error en el servidor'
                return rejectWithValue({ mensaje })
            } else if (error.request) {
                // No hubo respuesta del servidor
                return rejectWithValue({ mensaje: 'No se pudo conectar al servidor' })
            } else {
                // Otro error
                return rejectWithValue({ mensaje: 'Error desconocido' })
            }
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.usuario
            state.token = action.payload.token
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.mensaje || 'Error al registrar'
        })
    }
})

export default authSlice.reducer