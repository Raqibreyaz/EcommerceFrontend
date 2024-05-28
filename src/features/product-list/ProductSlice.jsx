import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchFilteredProducts } from './ProductApi';
import { useSelector } from 'react-redux';

// Define the async thunk
export const fetchAllProductsAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async (userId) => {
        const response = await fetchAllProducts(userId)
        // the value we return becomes the fulfilled action payload
        return response.data
    }
);

export const filterProductsAsync = createAsyncThunk('product/filterProducts',async (filter) => {
  const response = await fetchFilteredProducts(filter)
  return response.data;
}
)

// Define a slice
const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        status: 'idle'
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
            .addCase(filterProductsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(filterProductsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
    },
});

// Export the async thunk and reducer
export default productSlice.reducer;
