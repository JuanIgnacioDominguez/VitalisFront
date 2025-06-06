import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchTimeSlots } from '../../api/timeslots'

export const getTimeSlots = createAsyncThunk(
    'timeSlots/get',
    async ({ professionalId, date }, { rejectWithValue }) => {
        try {
            return await fetchTimeSlots(professionalId, date)
        } catch (e) {
            return rejectWithValue('Error al cargar horarios')
        }
    }
)

const timeSlotsSlice = createSlice({
    name: 'timeSlots',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearTimeSlots: (state) => {
            state.list = []
            state.loading = false
            state.error = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getTimeSlots.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(getTimeSlots.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload
            })
            .addCase(getTimeSlots.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { clearTimeSlots } = timeSlotsSlice.actions
export default timeSlotsSlice.reducer