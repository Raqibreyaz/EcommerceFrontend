import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productReviewApi = createApi({
    reducerPath: 'productReviewApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/v1/products/review/' }),

    tagTypes: ['ProductReview'],

    endpoints: (build) => ({

        createProductReview: build.mutation({
            query: ({ id, data }) => ({
                url: `add-review/${id}`,
                method: 'POST',
                body: data,
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            }),
        }),

        // fetching a specific review of a product of a user
        fetchUserReview: build.query({
            query: (id) => ({
                url: `get-user-review/${id}`,
                method: 'GET',
            }),
        }),

        editProductReview: build.mutation({
            query: () => ({
                url: `edit-review/${id}`,
                method: 'PUT',
                body: data,
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            }),
            // will cause o refetch the reviews according to the id of the product
            invalidatesTags: (result, error, { id }) => [{ type: 'ProductReview', id }],
        }),

        fetchProductReviews: build.query({
            query: (id) => ({
                url: `get-reviews/${id}`,
                method: 'GET',
            }),
            // will cache the reviews according to the id of the product
            providesTags: (result, error, id) => [{ type: 'ProductReview', id }],
        }),

    }),
});

// Export hooks generated by createApi for each endpoint
export const {
    useCreateProductReviewMutation,
    useEditProductReviewMutation,
    useFetchProductReviewsQuery,
    useFetchUserReviewQuery
} = productReviewApi;

