import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_HOST } from '../../utils/constants'
import { store } from '../store'

export const fetchProfessionals = createAsyncThunk(
    'professionals/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const state = store.getState()
            const token = state.auth.token 
            const res = await axios.get(`${API_HOST}professionals`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            return res.data
        } catch (e) {
            console.log('Error al cargar profesionales:', e)
            return rejectWithValue('Error al cargar profesionales')
        }
    }
)

const professionalsSlice = createSlice({
    name: 'professionals',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchProfessionals.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchProfessionals.fulfilled, (state, action) => {
            state.loading = false
            state.list = action.payload
        })
        .addCase(fetchProfessionals.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default professionalsSlice.reducer