import { makeRequest } from "../../utils/Generics";

export const addProductToWishlist = async (data) => {
    return await makeRequest(
        {
            method: 'put',
            url: `/users/wishlist/add-product/${data.id}`,
            withCredentials: true,
            data: data.data,
            headers: { "Content-Type": "application/json" }
        }
    )
}

export const removeProductFromWishlist = async (data) => {
    return await makeRequest({
        method: 'delete',
        url: `/users/wishlist/delete-product/${data.id}`,
        data: data.data,
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
    })
}

export const fetchWishlist = async () => {
    return await makeRequest({
        method: 'get',
        url: '/users/wishlist/get-wishlist',
        withCredentials: true,
    })
}

