import { makeRequest } from '../../utils/Generics.js'

const createOrder = async (data) => {
    return await makeRequest(
        {
            method: 'post',
            url: '/users/orders/create-order',
            data,
            withCredentials: true,
            headers: { "Content-Type": "application/json" }
        }
    )
}

const fetchOrders = async () => {
    return await makeRequest(
        {
            method: 'get',
            url: `/users/orders/get-orders`,
            withCredentials: true,
        }
    )
}

const fetchAllOrders = async () => {
    return await makeRequest(
        {
            method: 'get',
            url: `/users/orders/get-orders/all`,
            withCredentials: true,
        }
    )
}

const fetchOrderDetails = async (id) => {
    return await makeRequest(
        {
            method: 'get',
            url: `/users/orders/get-order-details/${id}`,
            withCredentials: true,
        }
    )
}

export {
    createOrder,
    fetchOrders,
    fetchAllOrders,
    fetchOrderDetails
}
