import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchCategories, fetchProductDetails, addNewProduct, deleteProduct, addNewCategory, editProduct} from './ProductApi';
import { wrapper } from '../../utils/catchErrorAndWrapper.js'
import { clearErrorAndSuccess } from '../../utils/Generics.js'

// fetches product from backend side can use filters
export const fetchProductsAsync = wrapper('product/fetchProducts', fetchProducts)

// fetche the product details from the backend using the id
export const fetchProductDetailsAsync = wrapper('product/fetchProductDetails', fetchProductDetails)

// adds a new product to the database 
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

            // success message will only be shown for non fetching requests
            if (!action.type.includes('fetch')) {
                state.success = action.payload.message
            }
            if (action.type === 'product/fetchProducts/fulfilled') {
                state.products = action.payload.products;
                state.filteredTotal = parseInt(action.payload.filteredTotal);
                state.overallTotal = parseInt(action.payload.overallTotal);
                state.totalPages = parseInt(action.payload.totalPages);
            }
            if (action.type === 'product/fetchProductDetails/fulfilled') {
                state.currentProduct = action.payload.product;
            }
            if (action.type === 'product/fetchCategories/fulfilled') {
                state.categories = action.payload.categories;
            }

        })
        .addCase(asyncThunk.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
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
            keyHighlights: [],
            sizes: [],
            colors: [],
            details: '',
            price: '',
            description: '',
            reviews: []
        },
        currentProductReviews: [],
        status: 'idle',
        success: '',
        error: null
    },
    reducers: {
        ...clearErrorAndSuccess
    },
    extraReducers: (builder) => {
        handleAsyncActions(builder, fetchProductsAsync)
        handleAsyncActions(builder, fetchProductDetailsAsync)
        handleAsyncActions(builder, addNewProductAsync)
        handleAsyncActions(builder, editProductAsync)
        handleAsyncActions(builder, fetchCategoriesAsync)
        handleAsyncActions(builder, addNewCategoryAsync)

    },
});

export const { clearError, clearSuccess } = productSlice.actions

// Export the async thunk and reducer
export default productSlice.reducer;
