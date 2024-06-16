import axios from "axios";

const fetchUserCart = async () => {
    const response = await axios.get('http://localhost:4000/api/v1/users/cart/get-cart', {
        withCredentials: true
    })
    return response;
}

const addProductToCart = async (product) => {
    const response = await axios.put(`http://localhost:4000/api/v1/users/cart/add-product`, product, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response;
}

const removeProductFromCart = async (product) => {
    const response = await axios.delete('http://localhost:4000/api/v1/users/cart/delete-product', {
        data: product,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    })

    return response
}

export {
    fetchUserCart,
    addProductToCart,
    removeProductFromCart
}