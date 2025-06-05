import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFavoritesByUser, addFavorite, removeFavorite } from '../../api/favorites'

export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async (userId, { rejectWithValue }) => {
        try {
        return await getFavoritesByUser(userId)
        } catch (e) {
        return rejectWithValue('Error al cargar favoritos')
        }
    }
)

export const toggleFavorite = createAsyncThunk(
    'favorites/toggleFavorite',
    async ({ userId, doctor }, { getState, rejectWithValue }) => {
        try {
        const state = getState()
        const fav = state.favorites.list.find(f => f.professionalId === doctor.id)
        if (fav) {
            await removeFavorite(fav.id)
            return { removed: fav.id }
        } else {
            const newFav = await addFavorite(userId, doctor.id)
            return { added: newFav }
        }
        } catch (e) {
        return rejectWithValue('Error al actualizar favorito')
        }
    }
)

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchFavorites.pending, state => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchFavorites.fulfilled, (state, action) => {
            state.loading = false
            state.list = action.payload
        })
        .addCase(fetchFavorites.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        .addCase(toggleFavorite.fulfilled, (state, action) => {
            if (action.payload?.removed) {
            state.list = state.list.filter(f => f.id !== action.payload.removed)
            } else if (action.payload?.added) {
            state.list.push(action.payload.added)
            }
        })
    }
})

export default favoritesSlice.reducer