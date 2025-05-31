import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { updateUser } from '../../Api/user'

export const updateUserThunk = createAsyncThunk(
    'editUser/updateUser',
    async ({ id, data, token }, { rejectWithValue }) => {
        try {
            const response = await updateUser(id, data, token)
            return response
        } catch (error) {
            return rejectWithValue(error.mensaje || 'Error al actualizar usuario')
        }
    }
)

const editUserSlice = createSlice({
    name: 'editUser',
    initialState: {
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearEditUserState: (state) => {
            state.loading = false
            state.error = null
            state.success = false
        }
    },
    extraReducers: builder => {
        builder
            .addCase(updateUserThunk.pending, (state) => {
                state.loading = true
                state.error = null
                state.success = false
            })
            .addCase(updateUserThunk.fulfilled, (state) => {
                state.loading = false
                state.success = true
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.success = false
            })
    }
})

export const { clearEditUserState } = editUserSlice.actions
export default editUserSlice.reducer