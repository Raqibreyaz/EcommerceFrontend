import { createSlice } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { wrapper } from '../../utils/catchErrorAndWrapper.js'
import { createOrder, fetchAllOrders, fetchOrderDetails, fetchOrders } from './orderApi.js';
import { clearErrorAndSuccess } from '../../utils/Generics.js';

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


export const orderApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000/api/v1/users/orders/`,
    credentials: 'include',
  }),
  reducerPath: 'orderApi',
  tagTypes: ['Order'],
  endpoints: (build) => ({

    createOrder: build.mutation({
      query: (data) => ({
        url: 'create-order',
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Order'],
    }),

    fetchOrders: build.query({
      query: () => ({
        url: 'get-orders',
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),

    fetchAllOrders: build.query({
      query: () => ({
        url: 'get-orders/all',
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),

    fetchOrderDetails: build.query({
      query: (id) => ({
        url: `get-order-details/${id}`,
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFetchOrdersQuery,
  useFetchAllOrdersQuery,
  useFetchOrderDetailsQuery,
} = orderApi;



export {
  createOrderAsync,
  fetchAllOrdersAsync,
  fetchOrdersAsync,
  fetchOrderDetailsAsync
}

export const { clearError, clearSuccess } = orderSlice.actions

export default orderSlice.reducer