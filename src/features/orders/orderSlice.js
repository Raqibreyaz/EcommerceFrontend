import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/users/orders/`,
    credentials: "include",
  }),
  reducerPath: "orderApi",
  tagTypes: [
    "Orders",
    "Order",
    "AllOrders",
    "Cart",
    "Returns",
    "ReturnDetails",
  ],

  keepUnusedDataFor: import.meta.env.VITE_CACHE_VALIDITY,

  endpoints: (build) => ({
    createRazorPayOrder: build.mutation({
      query: (data) => ({
        url: "create-razorpay-order",
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    verifyRazorPayPayment: build.mutation({
      query: (data) => ({
        url: "verify-razorpay-payment",
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),

    createOrder: build.mutation({
      query: (data) => ({
        url: "create-order",
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Orders", "AllOrders", "Cart"],
    }),

    fetchOrders: build.query({
      query: (query) => ({
        url: `get-orders?${query}`,
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    fetchAllOrders: build.query({
      query: (query) => ({
        url: `get-orders/all?${query}`,
        method: "GET",
      }),
      providesTags: ["AllOrders"],
    }),

    fetchOrderDetails: build.query({
      query: (id) => ({
        url: `get-order-details/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    cancelOrder: build.mutation({
      query: (id) => ({
        url: `cancel-order/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [
        "AllOrders",
        "Orders",
        { type: "Order", id },
      ],
    }),

    updateOrder: build.mutation({
      query: ({ deliveryStatus, id }) => ({
        url: `update-order/${id}`,
        method: "PATCH",
        body: { deliveryStatus },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: (result, error, { id }) => [
        "AllOrders",
        "Orders",
        { type: "Order", id },
      ],
    }),

    fetchReturnRequests: build.query({
      query: (query = "") => ({
        url: `get-return-requests?${query}`,
        method: "GET",
      }),
      providesTags: ["Returns"],
    }),

    createReturnRequest: build.mutation({
      query: ({ data, orderId }) => ({
        url: `create-return-request/${orderId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { orderId }) => [
        "Returns",
        { type: "Order", id: orderId },
      ],
    }),

    updateReturnRequest: build.mutation({
      query: ({ id, data }) => ({
        url: `update-return-request/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id, data }) => [
        "Returns",
        { type: "ReturnDetails", id },
        { type: "Order", id: data.orderId },
      ],
    }),

    fetchReturnRequestDetails: build.query({
      query: (id) => ({
        url: `get-return-details/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "ReturnDetails", id }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useFetchOrdersQuery,
  useFetchAllOrdersQuery,
  useFetchOrderDetailsQuery,
  useFetchReturnRequestsQuery,
  useFetchReturnRequestDetailsQuery,
  useCancelOrderMutation,
  useCreateReturnRequestMutation,
  useCreateRazorPayOrderMutation,
  useVerifyRazorPayPaymentMutation,
  useUpdateOrderMutation,
  useUpdateReturnRequestMutation,
} = orderApi;
