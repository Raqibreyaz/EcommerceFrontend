import { createSlice } from '@reduxjs/toolkit'
import { wrapper } from '../../catchErrorAndWrapper/catchErrorAndWrapper.js'
import { createOrder, fetchAllOrders, fetchOrders } from './orderApi.js';
import { clearErrorAndSuccess } from '../../Constants.js';

const createOrderAsync = wrapper('order/create-order', createOrder)

const fetchOrdersAsync = wrapper('order/get-orders', fetchOrders)

const fetchAllOrdersAsync = wrapper('order/get-orders', fetchAllOrders)

const handleAsyncActions = (builder, asyncThunk) => {

    builder
        .addCase(asyncThunk.pending, (state) => {
            state.status = 'loading',
                state.error = null
            state.success = ''
        }
        )
        .addCase(asyncThunk.fulfilled, (state, action) => {
            state.success = action.payload.message
            state.status = 'idle'
            console.log(action.payload);
            state.orders = action.payload.orders
        }
        )
        .addCase(asyncThunk.rejected, (state, action) => {
            console.log(action);
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
    reducers: {
        ...clearErrorAndSuccess
    },
    extraReducers: (builder) => {
        handleAsyncActions(builder, createOrderAsync)
        handleAsyncActions(builder, fetchOrdersAsync)
    }
})

export {
    createOrderAsync,
    fetchAllOrdersAsync,
    fetchOrdersAsync
}

export const { clearError, clearSuccess } = orderSlice.actions

export default orderSlice.reducer