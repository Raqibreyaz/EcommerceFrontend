import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { catchAsyncError, wrapper } from '../../utils/catchErrorAndWrapper.js'
import { clearErrorAndSuccess } from '../../utils/Generics.js'

const initialState = {
    status: 'idle',
    error: null,
    success: ''
};


const handleAsyncActions = (builder, asyncThunk) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            state.status = 'loading';
            state.error = null
            state.success = ''
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            state.success = action.payload.message
        })
        .addCase(asyncThunk.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message
        });
};

const wishlistSlice = createSlice({
    initialState,
    name: "wishlist",
    reducers: {
        ...clearErrorAndSuccess
    },
    extraReducers: (builder) => {

    }
})

export {

}

export const { clearError, clearSuccess } = wishlistSlice.actions

export default wishlistSlice.reducer;