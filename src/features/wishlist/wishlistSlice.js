import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/users/wishlist/`, // Adjust base URL as per your setup
    credentials: "include", // Ensure credentials are included in requests
  }),

  tagTypes: ["Wishlist", "IsInWishlist"],

  keepUnusedDataFor: import.meta.env.VITE_CACHE_VALIDITY,
  endpoints: (build) => ({
    addProductToWishlist: build.mutation({
      query: ({ id, ...data }) => ({
        url: `add-product/${id}`,
        method: "PUT",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "IsInWishlist", id },
        { type: "Wishlist", id: "list" },
      ], // Invalidate wishlist cache on mutation
    }),

    removeProductFromWishlist: build.mutation({
      query: ({ id, ...data }) => ({
        url: `delete-product/${id}`,
        method: "DELETE",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "IsInWishlist", id },
        { type: "Wishlist", id: "list" },
      ], // Invalidate wishlist cache on mutation
    }),

    fetchWishlist: build.query({
      query: () => "get-wishlist",
      providesTags: ["Wishlist"], // Cache wishlist data
    }),

    isProductInWishlist: build.query({
      query: (id) => `in-wishlist/${id}`,
      providesTags: (result, error, id) => [{ type: "IsInWishlist", id }],
    }),
  }),
});

export const {
  useAddProductToWishlistMutation,
  useRemoveProductFromWishlistMutation,
  useFetchWishlistQuery,
  useIsProductInWishlistQuery,
} = wishlistApi;
