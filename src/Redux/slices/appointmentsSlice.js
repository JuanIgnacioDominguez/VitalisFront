import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_HOST } from '../../utils/constants'

export const fetchAppointmentsThunk = createAsyncThunk(
    'appointments/fetchAll',
    async (userId, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_HOST}appointments?userId=${userId}`)
            return res.data
        } catch (e) {
            return rejectWithValue('Error al cargar turnos')
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
    }
})

export const { addAppointment, removeAppointment } = appointmentsSlice.actions
export default appointmentsSlice.reducer
