import { useCallback, useEffect, useState, useMemo } from "react"
import { createProductReviewAsync, fetchProductReviewsAsync, clearSuccess, clearError } from "../features/reviews/reviewSlice.js"
import { useSelector } from "react-redux"
import { useMessageAndClear } from "./useMessageAndClear.js"

export const useReviews = (productId) => {

    const { productReviews: reviews, status } = useSelector(state => state.review)

    const productReviews = useMemo(() => reviews, [reviews]);
    const reviewStatus = useMemo(() => status, [status])

    const [reload, setReload] = useState(false)

    const refreshReviews = useCallback(() => {
        setReload(!reload)
    }, [])

    const executeAndMessage = useMessageAndClear('review', clearError, clearSuccess)

    const createReview = useCallback((productId, data) => {
        executeAndMessage(createProductReviewAsync, { id: productId, data }, refreshReviews)
    }, [])


    const editReview = useCallback((productId, data) => {
        console.log(productId, data);
    }, [])


    // console.log('in useReviews ');

    useEffect(() => {
        executeAndMessage(fetchProductReviewsAsync, productId)
        console.log('useReview useEffect');
    }, [reload])

    return { reviewStatus, productReviews, createReview, editReview }
}
