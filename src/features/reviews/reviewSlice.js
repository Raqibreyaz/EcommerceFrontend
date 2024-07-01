import { createSlice } from "@reduxjs/toolkit";
import { wrapper } from '../../utils/catchErrorAndWrapper.js'
import { clearErrorAndSuccess } from '../../utils/Generics.js'
import { createProductReview, editProductReview, fetchProductReviews } from './reviewApi.js'

// fetches the reviews of the current product
export const fetchProductReviewsAsync = wrapper('product/getProductReviews', fetchProductReviews)

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
            state.success = action.payload.message
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

export const { clearError, clearSuccess } = reviewSlice.actions

export default reviewSlice.reducer