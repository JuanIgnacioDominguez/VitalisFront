import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_HOST } from '../../utils/constants'

export const fetchAppointmentsThunk = createAsyncThunk(
    'appointments/fetchAll',
    async ({ userId, token }, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_HOST}appointments/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return res.data
        } catch (e) {
            if (e.response?.status === 403) {
                return rejectWithValue('No tienes permisos para ver estos turnos')
            }
            return rejectWithValue('Error al cargar turnos')
        }
    }
)

export const updateExpiredAppointments = createAsyncThunk(
    'appointments/updateExpired',
    async ({ userId, token }, { rejectWithValue }) => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split('T')[0]
            const currentTime = now.toTimeString().split(' ')[0].substring(0, 5)
            
            const res = await axios.put(`${API_HOST}appointments/user/${userId}/update-expired`, {
                currentDate: currentDate,
                currentTime: currentTime
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            return res.data
        } catch (e) {
            return rejectWithValue('Error al actualizar turnos vencidos')
        }
    }
)

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        addAppointment: (state, action) => {
            state.list.push(action.payload)
        },
        removeAppointment: (state, action) => {
            state.list = state.list.filter(a => a.id !== action.payload)
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAppointmentsThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAppointmentsThunk.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(fetchAppointmentsThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(updateExpiredAppointments.fulfilled, (state, action) => {
                state.list = action.payload
            })
    }
})

export const { addAppointment, removeAppointment } = appointmentsSlice.actions
export default appointmentsSlice.reducer
