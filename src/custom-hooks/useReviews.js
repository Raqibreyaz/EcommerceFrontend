import { useCallback, useEffect } from "react"
import { createProductReviewAsync, fetchProductReviewsAsync, clearSuccess, clearError } from "../features/reviews/reviewSlice.js"
import { useDispatch, useSelector } from "react-redux"
import { FailedMessage, SuccessMessage } from "../components/MessageDialog"
import { useMessageAndClear } from "./useMessageAndClear.js"

export const useReviews = () => {

    const { productReviews, status: reviewStatus } = useSelector(state => state.review)

    const executeAndMessage = useMessageAndClear('review', clearError, clearSuccess)

    // dispatch(createProductReviewAsync({ id: productId, data }))
    //     .unwrap()
    //     .then(() => {
    //         SuccessMessage(reviewSuccess)
    //         dispatch(clearSuccess())
    //     })
    //     .catch(() => {
    //         FailedMessage(reviewError)
    //         dispatch(clearError())
    //     })
    const createReview = useCallback((productId, data) => {
        executeAndMessage(createProductReviewAsync, { id: productId, data })
    }, [])


    const editReview = useCallback((productId, data) => {
        console.log(productId, data);
    }, [])

    useEffect(() => {
        // dispatch(fetchProductReviewsAsync)
        executeAndMessage(fetchProductReviewsAsync)
    }, [])

    return { reviewStatus, productReviews, createReview, editReview }
}
