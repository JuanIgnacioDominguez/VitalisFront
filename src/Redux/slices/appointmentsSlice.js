import { createSlice } from '@reduxjs/toolkit'

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: { list: [] },
    reducers: {
        addAppointment: (state, action) => {
        state.list.push(action.payload)
        },
        removeAppointment: (state, action) => {
        state.list = state.list.filter(a => a.id !== action.payload)
        },
    },
})

export const { addAppointment, removeAppointment } = appointmentsSlice.actions
export default appointmentsSlice.reducer
