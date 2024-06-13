import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories, fetchProductDetails, addNewProduct } from './ProductApi';
import { useSelector } from 'react-redux';
import { catchAsyncError } from '../../catchAsyncError/catchAsyncError.js'

// Define the async thunk
export const fetchProductsAsync = createAsyncThunk(
    'product/fetchProducts',
    async (filter = '') => {

        const [error, response] = await catchAsyncError(fetchProducts, filter)

        if (error)
            throw new Error(error.response.data.message)

        console.log(response.data);
        // the value we return becomes the fulfilled action payload
        return response.data
    }
);

export const fetchProductDetailsAsync = createAsyncThunk('product/fetchProductDetails', async (id) => {
    const [error, response] = await catchAsyncError(fetchProductDetails, id)

    if (error)
        throw new Error(error.response.data.message)

    console.log(response.data);
    return response.data
}
)

export const fetchCategoriesAsync = createAsyncThunk('product/fetchCategories', async () => {

    const [error, result] = await catchAsyncError(fetchCategories)

    if (error)
        throw new Error(error.response.data.message)

    return result.data
}
)

export const addNewProductAsync = createAsyncThunk('product/addNewProduct', async (productData) => {

    let [error, result] = await catchAsyncError(addNewProduct, productData)

    if (error) {
        throw new Error(error.response.data.message)
    }
    return result.data
}
)

const handleAsyncActions = (builder, asyncThunk) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            state.status = 'loading';
            state.error = null
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {

            state.status = 'idle';
            state.error = null
            state.success = action.payload.message

            console.log(action, addNewProductAsync.fulfilled);

            if (action.type === 'product/addNewProduct/fulfilled') {
                console.log('fulfill message');
            }
            if (action.type === 'product/fetchProducts/fulfilled') {
                state.status = 'idle';
                state.products = action.payload.products;
                state.filteredTotal = action.payload.filteredTotal;
                state.overallTotal = action.payload.overallTotal;
                state.totalPages = action.payload.totalPages;
            }
            if (action.type === 'product/fetchProductDetails/fulfilled') {
                state.currentProduct = action.payload.product;
            }
            if (action.type === 'product/fetchCategories/fulfilled') {
                state.categories = action.payload.categories;
            }

        })
        .addCase(asyncThunk.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            if(action.type ==='product/fetchCategories/rejected')
                console.log(action);
        });
};

// Define a slice
const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        filteredTotal: 0,
        overallTotal: 0,
        totalPages: 0,
        categories: [],
        currentProduct: {},
        productOwners: [],
        status: 'idle',
        success: '',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        handleAsyncActions(builder, fetchProductsAsync)
        handleAsyncActions(builder, fetchProductDetailsAsync)
        handleAsyncActions(builder, fetchCategoriesAsync)
        handleAsyncActions(builder, addNewProductAsync)
    },
});

// Export the async thunk and reducer
export default productSlice.reducer;
