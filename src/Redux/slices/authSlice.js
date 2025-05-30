import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Thunk para registrar usuario
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch('http://10.0.2.2:4002/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            })
            if (!response.ok) {
                const errorData = await response.json()
                console.error('Error del backend:', errorData) 
                return rejectWithValue(errorData)
            }
            else{
                console.log('Registro exitoso:', await response.json()) 
            }
            return await response.json()
        } catch (error) {
            console.error('Error de red:', error) 
            return rejectWithValue({ mensaje: 'Error de red' })
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false
            state.user = action.payload.usuario
            state.token = action.payload.token
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload?.mensaje || 'Error al registrar'
        })
    }
})

export default authSlice.reducer