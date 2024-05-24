import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchData } from './CounterApi.jsx';

// Define the async thunk
export const fetchUserById = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId) => {
        return await fetchData(userId)
    }
);

// Define a slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

// Export the async thunk and reducer
export { fetchUserById };
export default userSlice.reducer;
