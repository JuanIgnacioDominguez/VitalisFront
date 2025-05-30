import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Thunk para registrar usuario usando axios
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        console.log('Datos de usuario a registrar:', userData)
        try {
            const response = await axios.post('http://10.0.2.2:4002/auth/register', userData)
            console.log('Registro exitoso:', response.data)
            return response.data
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Error del backend:', error.response.data)
                return rejectWithValue(error.response.data)
            } else {
                console.error('Error de red:', error.message)
                return rejectWithValue({ mensaje: 'Error de red' })
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