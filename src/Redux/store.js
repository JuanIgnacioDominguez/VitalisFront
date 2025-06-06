import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../api/auth'
import appointmentsReducer from './slices/appointmentsSlice'
import editUserReducer from './slices/EditUserSlice'
import professionalsReducer from './slices/professionalsSlice'
import favoritesReducer from './slices/favoritesSlice'
import timeSlotsReducer from './slices/timeSlotsSlice' // Agrega esta línea

export const store = configureStore({
    reducer: {
        auth: authReducer,
        appointments: appointmentsReducer,
        editUser: editUserReducer,
        professionals: professionalsReducer,
        favorites: favoritesReducer,
        timeSlots: timeSlotsReducer, // Agrega esta línea
    },
})