import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../api/auth'
import appointmentsReducer from './slices/appointmentsSlice'
import editUserReducer from './slices/EditUserSlice'
import professionalsReducer from './slices/professionalsSlice'
import favoritesReducer from './slices/favoritesSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        appointments: appointmentsReducer,
        editUser: editUserReducer,
        professionals: professionalsReducer,
        favorites: favoritesReducer,
    },
})