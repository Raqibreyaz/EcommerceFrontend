import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { catchAsyncError, wrapper } from '../../utils/catchErrorAndWrapper.js'
import { clearErrorAndSuccess } from '../../utils/Generics.js'
import { addProductToWishlist, fetchWishlist, removeProductFromWishlist } from './wishlistApi.js'

const initialState = {
    wishlistData: [],
    status: 'idle',
    error: null,
    success: ''
};

const addProductToWishlistAsync = wrapper('wishlist/add-product', addProductToWishlist)

const removeProductFromWishlistAsync = wrapper('wishlist/remove-product', removeProductFromWishlist)

const fetchWishlistAsync = wrapper('wishlist/get-wishlist', fetchWishlist)

const handleAsyncActions = (builder, asyncThunk) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            state.status = 'loading';
            state.error = null
            state.success = ''
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {
            state.status = 'idle';
            if (action.type.includes('get-wishlist')) {
                state.wishlistData = action.payload.wishlist
            }
            else
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
        handleAsyncActions(builder, addProductToWishlistAsync)
        handleAsyncActions(builder, removeProductFromWishlistAsync)
        handleAsyncActions(builder, fetchWishlistAsync)
    }
})


export const wishlistApi = createApi({

    reducerPath: 'wishlistApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/users/wishlist/', // Adjust base URL as per your setup
        credentials: 'include', // Ensure credentials are included in requests
    }),

    tagTypes: ['Wishlist', 'IsInWishlist'],

    endpoints: (build) => ({

        addProductToWishlist: build.mutation({
            query: ({ id, ...data }) => ({
                url: `add-product/${id}`,
                method: 'PUT',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'IsInWishlist', id },
                { type: 'Wishlist', id: 'list' }
            ], // Invalidate wishlist cache on mutation
        }),

        removeProductFromWishlist: build.mutation({
            query: ({ id, ...data }) => ({
                url: `delete-product/${id}`,
                method: 'DELETE',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'IsInWishlist', id },
                { type: 'Wishlist', id: 'list' }
            ], // Invalidate wishlist cache on mutation
        }),

        fetchWishlist: build.query({
            query: () => 'get-wishlist',
            providesTags: ['Wishlist'], // Cache wishlist data
        }),

        isProductInWishlist: build.query({
            query: (id) => `in-wishlist/${id}`,
            providesTags: (result, error, id) => [{ type: 'IsInWishlist', id }]
        }),
    }),
});

export const { useAddProductToWishlistMutation, useRemoveProductFromWishlistMutation, useFetchWishlistQuery, useIsProductInWishlistQuery } = wishlistApi;


export {
    addProductToWishlistAsync,
    removeProductFromWishlistAsync,
    fetchWishlistAsync
}

export const { clearError, clearSuccess } = wishlistSlice.actions

export default wishlistSlice.reducer;