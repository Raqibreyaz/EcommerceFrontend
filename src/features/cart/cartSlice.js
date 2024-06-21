import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserCart, addProductToCart, removeProductFromCart } from "./cartApi.js";
import { catchAsyncError } from '../../catchAsyncError/catchAsyncError.js'

const initialState = {
    userCart: [],
    status: 'idle',
    error: null,
    success: ''
};

const fetchUserCartAsync = createAsyncThunk("cart/fetchUserCart", async () => {
    const [error, result] = await catchAsyncError(fetchUserCart)

    if (error)
        throw new Error(error.response.data.message)

    return result.data;
})

const addProductToCartAsync = createAsyncThunk('cart/addProductToCart', async (cartProduct) => {
    const [error, result] = await catchAsyncError(addProductToCart, cartProduct)

    if (error)
        throw new Error(error.response.data.message)

    return result.data
}
)

const removeProductFromCartAsync = createAsyncThunk('cart/removeProductFromCart', async (cartProduct) => {
    const [error, result] = await catchAsyncError(removeProductFromCart, cartProduct)

    if (error)
        throw new Error(error.response.data.message)
    return result.data
}
)

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
                console.log(action.payload);
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