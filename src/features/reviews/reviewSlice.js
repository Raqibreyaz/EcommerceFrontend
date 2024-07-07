import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { wrapper } from '../../utils/catchErrorAndWrapper.js'
import { clearErrorAndSuccess } from '../../utils/Generics.js'
import { createProductReview, editProductReview, fetchProductReviews } from './reviewApi.js'
import { createApi } from "@reduxjs/toolkit/query";

// fetches the reviews of the current product
export const fetchProductReviewsAsync = wrapper('product/fetchProductReviews', fetchProductReviews)

// create a review for the current product
export const createProductReviewAsync = wrapper('product/createProductReview', createProductReview)

// edits the review of the current product
export const editProductReviewAsync = wrapper('product/editProductReview', editProductReview)

const handleAsyncActions = (builder, asyncThunk) => {
    builder
        .addCase(asyncThunk.pending, (state) => {
            state.status = 'loading';
            state.error = null
            state.success = ''
        })
        .addCase(asyncThunk.fulfilled, (state, action) => {
            state.status = 'idle'

            if (!action.type.includes('fetch'))
                state.success = action.payload.message

            if (action.type.includes('product/fetchProductReviews'))
                state.productReviews = action.payload.reviews
        })
        .addCase(asyncThunk.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
        });
};

const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        productReviews: [],
        status: 'idle',
        success: '',
        error: null
    },
    reducers: {
        ...clearErrorAndSuccess
    },
    extraReducers: (builder) => {
        handleAsyncActions(builder, fetchProductReviewsAsync)
        handleAsyncActions(builder, createProductReviewAsync)
        handleAsyncActions(builder, editProductReviewAsync)
    },
});


export const productReviewApi = createApi({
    reducerPath: 'productReviewApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/v1/products/review/' }),

    tagTypes: ['ProductReview'],

    endpoints: (build) => ({

        createProductReview: build.mutation({
            query: ({ id, ...data }) => ({
                url: `add-review/${id}`,
                method: 'POST',
                body: data,
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
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
            invalidatesTags: (result, error, { id }) => [{ type: 'ProductReview', id }],
        }),

        fetchProductReviews: build.query({
            query: (id) => ({
                url: `get-reviews/${productId}`,
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
} = productReviewApi;


export const { clearError, clearSuccess } = reviewSlice.actions

export default reviewSlice.reducer