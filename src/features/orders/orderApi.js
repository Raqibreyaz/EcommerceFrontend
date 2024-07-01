import axios from "axios"

const createOrder = async (data) => {
    const response = await axios.post('http://localhost:4000/api/v1/users/orders/create-order', data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response
}

const fetchOrders = async () => {
    const response = await axios.get('http://localhost:4000/api/v1/users/orders/get-orders', {
        withCredentials: true
    })
    return response
}

const fetchAllOrders = async () => {
    const response = await axios.get('http://localhost:4000/api/v1/users/orders/get-orders/all', {
        withCredentials: true
    })
    return response
}

const fetchOrderDetails = async (id) => {
    const response = await axios.get(`http://localhost:4000/api/v1/users/orders/get-order-details/${id}`, {
        withCredentials: true
    })
    return response
}

export {
    createOrder,
    fetchOrders,
    fetchAllOrders,
    fetchOrderDetails
}
