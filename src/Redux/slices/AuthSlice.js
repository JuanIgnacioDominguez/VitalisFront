import { createSlice } from '@reduxjs/toolkit'

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
        setUser: (state, action) => {
            state.user = { ...state.user, ...action.payload }
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
        logout: (state) => {
            state.user = null
            state.token = null
        },
        clearRegisterSuccess: (state) => {
            state.registerSuccess = false
        }
        
    }
})

export const { clearRegisterSuccess } = authSlice.actions
export default authSlice.reducer