import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserCart } from "./cartApi.js";

const initialState = {
    cart: null,
    status: 'idle',
    error: null,
};

const fetchUserCartAsync = createAsyncThunk("cart/fetchUserCart", async () => {
    const response = await fetchUserCart();
    return response.data;
})

const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCartAsync.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(fetchUserCartAsync.fulfilled, (state, action) => {

            })
            .addCase(fetchUserCartAsync.rejected, (state, action) => {
                state.status = 'rejected'
                state.error = action.error.message;
            })
    }
})

export {
  fetchUserCartAsync
}

export default cartSlice.reducer;