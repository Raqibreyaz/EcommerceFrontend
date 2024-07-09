import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000/api/v1/users/orders/`,
    credentials: 'include',
  }),
  reducerPath: 'orderApi',
  tagTypes: ['Orders', 'Order'],
  endpoints: (build) => ({

    createOrder: build.mutation({
      query: (data) => ({
        url: 'create-Orders',
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Orders'],
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
      providesTags: ['Orders'],
    }),

    fetchOrderDetails: build.query({
      query: (id) => ({
        url: `get-Orders-details/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{type: 'Order', id}],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFetchOrdersQuery,
  useFetchAllOrdersQuery,
  useFetchOrderDetailsQuery,
} = orderApi;
