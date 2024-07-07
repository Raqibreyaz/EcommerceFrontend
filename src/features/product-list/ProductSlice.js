import { createSlice } from '@reduxjs/toolkit';
import { createApi,fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fetchProducts, fetchCategories, fetchProductDetails, addNewProduct, deleteProduct, addNewCategory, editProduct } from './ProductApi';
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
})


export const productApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/products/',
    }),
    reducerPath: 'productApi',
    tagTypes: ['Products', 'Product', 'Categories'],
    endpoints: (build) => ({

        fetchProducts: build.query({
            query: (filter = '') => ({
                url: `get-products?${filter}`,
                method: 'GET',
            }),
            providesTags: ['Products'],
        }),

        fetchCategories: build.query({
            query: () => ({
                url: 'category/get-categories',
                method: 'GET',
            }),
            providesTags: ['Categories'],
        }),

        fetchProductDetails: build.query({
            query: (id) => ({
                url: `get-product/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),

        addNewProduct: build.mutation({
            query: (productData) => ({
                url: 'addnew',
                method: 'POST',
                body: productData,
                credentials: 'include',
            }),
            invalidatesTags: ['Products'],
        }),

        editProduct: build.mutation({
            query: ({ id, ...data }) => ({
                url: `edit-product/${id}`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            }),
            // will refetch that particular product having that id
            invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
        }),

        deleteProduct: build.mutation({
            query: (id) => ({
                url: `delete-product/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Products'],
        }),

        addNewCategory: build.mutation({
            query: (category) => ({
                url: 'category/add-category',
                method: 'POST',
                body: { name: category },
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            }),
            invalidatesTags: ['Categories'],
        }),
    }),

});

export const {
    useFetchProductsQuery,
    useFetchCategoriesQuery,
    useFetchProductDetailsQuery,
    useAddNewProductMutation,
    useEditProductMutation,
    useDeleteProductMutation,
    useAddNewCategoryMutation,
} = productApi;



export const { clearError, clearSuccess } = productSlice.actions

// Export the async thunk and reducer
export default productSlice.reducer;
