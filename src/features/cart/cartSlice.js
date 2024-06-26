import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserCart, addProductToCart, removeProductFromCart } from "./cartApi.js";
import { catchAsyncError, wrapper } from '../../catchErrorAndWrapper/catchErrorAndWrapper.js'

const initialState = {
    userCart: [],
    status: 'idle',
    error: null,
    success: ''
};

// fethces the users cart 
const fetchUserCartAsync = wrapper("cart/fetchUserCart", fetchUserCart)

// adds a product to the users cart using the product id ,color,size,quantity
const addProductToCartAsync = wrapper('cart/addProductToCart', addProductToCart)

// removes  a product from the users cart using the product id,color,size
const removeProductFromCartAsync = wrapper('cart/removeProductFromCart', removeProductFromCart)

const handleAsyncActions = (builder, asyncThunk) => {

    builder
        .addCase(asyncThunk.pending, (state) => {
            state.status = 'loading',
                state.error = null
            state.success = ''
        }
        )
        .addCase(asyncThunk.fulfilled, (state, action) => {

            state.success = action.message
            state.status = 'idle'

            if (action.type === 'cart/fetchUserCart/fulfilled') {
                state.userCart = action.payload.userCart
            }
        }
        )
        .addCase(asyncThunk.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'failed'
        }
        )

};


const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {},
    extraReducers: (builder) => {
        handleAsyncActions(builder, fetchUserCartAsync)
        handleAsyncActions(builder, addProductToCartAsync)
        handleAsyncActions(builder, removeProductFromCartAsync)
    }
})

export {
    fetchUserCartAsync,
    addProductToCartAsync,
    removeProductFromCartAsync
}

export default cartSlice.reducer;