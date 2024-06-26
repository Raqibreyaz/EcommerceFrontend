import {  createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories, fetchProductDetails, addNewProduct, deleteProduct, addNewCategory, editProduct } from './ProductApi';
import {  wrapper } from '../../catchErrorAndWrapper/catchErrorAndWrapper.js'

// fetches product from backend side can use filters
export const fetchProductsAsync = wrapper('product/fetchProducts', fetchProducts)

// fetche the product details from the backend using the id
export const fetchProductDetailsAsync = wrapper('product/fetchProductDetails', fetchProductDetails)

// adds a new category to the database taking the name of it
export const addNewProductAsync = wrapper('product/addNewProduct', addNewProduct)

// edit the product by provided params
export const editProductAsync = wrapper('product/editProduct', editProduct)

// deletes the product from the database
export const deleteProductAsync = wrapper('product/deleteProduct', deleteProduct)

// fetches all the categories of products
export const fetchCategoriesAsync = wrapper('product/fetchCategories', fetchCategories)

// adds a new category
export const addNewCategoryAsync = wrapper('product/addNewCategory', addNewCategory)

const handleAsyncActions = (builder, asyncThunk) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            state.status = 'loading';
            state.error = null
            state.success = ''
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {

            state.status = 'idle'
            state.success = action.payload.message

            console.log(action, addNewProductAsync.fulfilled);

            if (action.type === 'product/addNewProduct/fulfilled') {
                console.log('fulfill message');
            }
            if (action.type === 'product/fetchProducts/fulfilled') {
                console.log(action.payload);
                state.status = 'idle';
                state.products = action.payload.products;
                state.filteredTotal = action.payload.filteredTotal;
                state.overallTotal = action.payload.overallTotal;
                state.totalPages = action.payload.totalPages;
            }
            if (action.type === 'product/fetchProductDetails/fulfilled' || action.type === 'product/editProduct/fulfilled') {
                state.currentProduct = action.payload.product;
            }
            if (action.type === 'product/fetchCategories/fulfilled') {
                state.categories = action.payload.categories;
            }

        })
        .addCase(asyncThunk.rejected, (state, action) => {

            state.status = 'rejected'
            state.error = action.error.message;
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
        currentProduct: {
            product_name: '',
            thumbnail: { url: '', public_id: '' },
            keyHighlights: [],
            sizes: [],
            colors: [],
            details: '',
            price: '',
            description: '',
            reviews: []
        },
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
