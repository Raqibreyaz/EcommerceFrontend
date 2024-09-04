import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const cartApi = createApi({

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/users/cart/`,
    credentials: 'include',
  }),

  reducerPath: 'cartApi',

  tagTypes: ['Cart'],

  keepUnusedDataFor: import.meta.env.VITE_CACHE_VALIDITY,

  endpoints: (build) => ({

    fetchUserCart: build.query({
      query: () => ({
        url: 'get-cart',
        method: 'GET',
      }),
      providesTags: ['Cart'],
    }),

    addProductToCart: build.mutation({
      query: ({ id, ...data }) => ({
        url: `add-product/${id}`,
        method: 'PUT',
        body: data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeProductFromCart: build.mutation({
      query: ({ id, ...data }) => ({
        url: `delete-product/${id}`,
        method: 'DELETE',
        body: data,
        headers: { 'Content-Type': 'application/json' },
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useFetchUserCartQuery,
  useAddProductToCartMutation,
  useRemoveProductFromCartMutation,
} = cartApi;
