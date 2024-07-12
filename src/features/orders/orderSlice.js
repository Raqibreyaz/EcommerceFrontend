import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000/api/v1/users/orders/`,
    credentials: 'include',
  }),
  reducerPath: 'orderApi',
  tagTypes: ['Orders', 'Order', 'AllOrders'],
  endpoints: (build) => ({

    createRazorPayOrder: build.mutation({
      query: (data) => ({
        url: 'create-razorpay-order',
        method: 'POST',
        body: data,
        headers: { "Content-Type": "application/json" }
      })
    }),

    verifyRazorPayPayment: build.mutation({
      query: (data) => ({
        url: 'verify-razorpay-payment',
        method: 'POST',
        body: data,
        headers: { "Content-Type": "application/json" }
      })
    }),

    createOrder: build.mutation({
      query: (data) => ({
        url: 'create-Orders',
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Orders', 'AllOrders'],
    }),

    fetchOrders: build.query({
      query: () => ({
        url: 'get-orders',
        method: 'GET',
      }),
      providesTags: ['Orders'],
    }),

    fetchAllOrders: build.query({
      query: () => ({
        url: 'get-orders/all',
        method: 'GET',
      }),
      providesTags: ['AllOrders'],
    }),

    fetchOrderDetails: build.query({
      query: (id) => ({
        url: `get-order-details/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFetchOrdersQuery,
  useFetchAllOrdersQuery,
  useFetchOrderDetailsQuery,
  useCreateRazorPayOrderMutation,
  useVerifyRazorPayPaymentMutation
} = orderApi;
