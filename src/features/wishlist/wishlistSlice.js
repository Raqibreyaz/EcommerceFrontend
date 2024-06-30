import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
            state.success = action.payload.message
            if (action.type.includes('get-wishlist')) {
                state.wishlistData = action.payload.wishlist
            }
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

export {
    addProductToWishlistAsync,
    removeProductFromWishlist,
    fetchWishlistAsync
}

export const { clearError, clearSuccess } = wishlistSlice.actions

export default wishlistSlice.reducer;