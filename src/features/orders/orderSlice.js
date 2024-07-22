import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { cartApi } from '../cart/cartSlice';

export const orderApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000/api/v1/users/orders/`,
    credentials: 'include',
  }),
  reducerPath: 'orderApi',
  tagTypes: ['Orders', 'Order', 'AllOrders', 'Cart', 'Returns'],
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
        url: 'create-order',
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Orders', 'AllOrders', 'Cart'],
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

    cancelOrder: build.mutation({
      query: (id) => ({
        url: `cancel-order/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => (
        [
          'AllOrders',
          'Orders',
          { type: 'Order', id }
        ]
      )
    }),

    updateOrder: build.mutation({
      query: ({ deliveryStatus, id }) => ({
        url: `update-order/${id}`,
        method: 'PATCH',
        body: { deliveryStatus },
        headers: { 'Content-Type': 'application/json' }
      }),
      invalidatesTags: (result, error, { id }) => (
        [
          'AllOrders',
          'Orders',
          { type: 'Order', id }
        ]
      )
    }),

    fetchReturnRequests: build.query({
      query: () => ({
        url: 'get-return-requests',
        method: 'GET',
      }),
      providesTags: ['Returns']
    }),

    createReturnRequest: build.mutation({
      query: ({ data, orderId }) => ({
        url: `create-return-request/${orderId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { orderId }) => ['AllOrders', 'Orders', 'Returns', { type: 'Order', id: orderId }]
    }),

    updateReturnRequest: () => ({
      query: ({ id, data }) => ({
        url: `update-return-request/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => ['AllOrders', 'Orders', 'Returns', { type: 'Order', id }]
    })
  }),
});

export const {
  useCreateOrderMutation,
  useFetchOrdersQuery,
  useFetchAllOrdersQuery,
  useFetchOrderDetailsQuery,
  useCancelOrderMutation,
  useCreateReturnRequestMutation,
  useCreateRazorPayOrderMutation,
  useVerifyRazorPayPaymentMutation,
  useUpdateOrderMutation
} = orderApi;
