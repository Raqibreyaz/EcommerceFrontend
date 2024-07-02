import { makeRequest } from "../../utils/Generics";

const fetchUserCart = async () => {
    return await makeRequest(
        {
            method: 'get',
            url: '/users/cart/get-cart',
            withCredentials: true,
        }
    )
}

const addProductToCart = async (data) => {
    return await makeRequest(
        {
            method: 'put',
            url: `/users/cart/add-product/${data.id}`,
            data: data.data,
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        }

    )
}

const removeProductFromCart = async (data) => {
    return await makeRequest(
        {
            method: 'delete',
            url: `/users/cart/delete-product/${data.id}`,
            data: data.data,
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        }

    )
}

export {
    fetchUserCart,
    addProductToCart,
    removeProductFromCart
}