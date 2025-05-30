import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Api/auth'
import appointmentsReducer from './slices/appointmentsSlice'
import editUserReducer from './slices/EditUserSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        appointments: appointmentsReducer,
        editUser: editUserReducer,
    },
})
