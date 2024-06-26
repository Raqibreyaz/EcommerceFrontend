import { createSlice } from '@reduxjs/toolkit'
import { wrapper } from '../../catchErrorAndWrapper/catchErrorAndWrapper.js'
import { createOrder } from './orderApi.js';

const createOrderAsync = wrapper('order/create-order', createOrder)

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

        }
        )
        .addCase(asyncThunk.rejected, (state, action) => {
            state.error = action.error.message
            state.status = 'failed'
        }
        )

};

const orderSlice = createSlice({
    initialState: {
        orders: [],
        status: 'idle',
        error: null,
        success: ''
    },
    name: "order",
    reducers: {},
    extraReducers: (builder) => {
        handleAsyncActions(builder, createOrderAsync)
    }
})

export {
    createOrderAsync
}

export default orderSlice.reducer