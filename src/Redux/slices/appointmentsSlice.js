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
            const res = await axios.put(`${API_HOST}appointments/user/${userId}/update-expired`, {}, {
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
        updateExpiredStatus: (state) => {
            const now = new Date()
            state.list.forEach(appointment => {
                if (appointment.status === 'pending') {
                    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`)
                    if (appointmentDateTime < now) {
                        appointment.status = 'completed'
                    }
                }
            })
        }
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

export const { addAppointment, removeAppointment, updateExpiredStatus } = appointmentsSlice.actions
export default appointmentsSlice.reducer
