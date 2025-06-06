import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_HOST } from '../utils/constants'

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_HOST}auth/register`, userData)
            return response.data
        } catch (error) {
            if (error.response) {
                const mensaje = error.response.data?.mensaje || 'Error en el servidor'
                return rejectWithValue({ mensaje })
            } else if (error.request) {
                return rejectWithValue({ mensaje: 'No se pudo conectar al servidor' })
            } else {
                return rejectWithValue({ mensaje: 'Error desconocido' })
            }
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_HOST}auth/login`, userData)
            return response.data
        } catch (error) {
            if (error.response) {
                const mensaje = error.response.data?.mensaje || 'Error en el servidor'
                return rejectWithValue({ mensaje })
            } else if (error.request) {
                return rejectWithValue({ mensaje: 'No se pudo conectar al servidor' })
            } else {
                return rejectWithValue({ mensaje: 'Error desconocido' })
            }
        }
    }
)

export const requestPasswordReset = async (email) => {
    console.log('Enviando email para restablecer contraseña:', email)
    const res = await axios.post(`${API_HOST}auth/request-password-reset`, { email })
    return res.data
}

export const verifyResetCode = async (email, code) => {
    const res = await axios.post(`${API_HOST}auth/verify-reset-code`, { email, code })
    return res.data
}

export const resetPassword = async (email, nueva, code) => {
    const res = await axios.put(`${API_HOST}auth/reset-password`, { email, nueva, code })
    return res.data
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
        registerSuccess: false, 
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.error = null
        },
        setUser: (state, action) => {
            state.user = { ...state.user, ...action.payload }
        },
        clearRegisterSuccess: (state) => {
            state.registerSuccess = false
        }
    },
    extraReducers: builder => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
            state.registerSuccess = false
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            state.registerSuccess = true 
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.mensaje || 'Error al registrar'
            state.registerSuccess = false
        })
        .addCase(loginUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.usuario
            state.token = action.payload.token
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.mensaje || 'Error al iniciar sesión'
        })
    }
})

export const { logout, setUser, clearRegisterSuccess } = authSlice.actions
export default authSlice.reducer