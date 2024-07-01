import { makeRequest } from "../../utils/Generics"

const createProductReview = async (data) => {
    return await makeRequest(
        {
            method: 'post',
            url: `/products/review/add-review/${data.id}`,
            data: data.data,
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        }
    )
}

const editProductReview = async (data) => {
    return await makeRequest(
        {
            method: 'put',
            url: `/products/review/edit-review/${data.id}`,
            data: data.data,
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        }
    )
}

const fetchProductReviews = async () => {
    return await makeRequest(
        {
            method: 'get',
            url: '/products/review/get-reviews',
            withCredentials: false,
        }
    )
}

export {
    createProductReview,
    editProductReview,
    fetchProductReviews
}
