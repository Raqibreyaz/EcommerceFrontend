import { createSlice } from '@reduxjs/toolkit'
import { wrapper } from '../../catchErrorAndWrapper/catchErrorAndWrapper.js'
import { createOrder, fetchAllOrders, fetchOrderDetails, fetchOrders } from './orderApi.js';
import { clearErrorAndSuccess } from '../../Constants.js';

const createOrderAsync = wrapper('order/create-order', createOrder)

const fetchOrdersAsync = wrapper('order/get-orders', fetchOrders)

const fetchAllOrdersAsync = wrapper('order/get-orders/all', fetchAllOrders)

const fetchOrderDetailsAsync = wrapper('order/get-order-details', fetchOrderDetails)

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

            if (action.type === 'order/get-orders/fulfilled') {
                state.orders = action.payload.orders
            }
            if (action.type === 'order/get-order-details/fulfilled') {
                state.fetchedOrder = action.payload.orderDetails
            }
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
        fetchedOrder: {},
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
        handleAsyncActions(builder, fetchOrderDetailsAsync)
    }
})

export {
    createOrderAsync,
    fetchAllOrdersAsync,
    fetchOrdersAsync,
    fetchOrderDetailsAsync
}

export const { clearError, clearSuccess } = orderSlice.actions

export default orderSlice.reducer