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

export {
    createOrder
}
