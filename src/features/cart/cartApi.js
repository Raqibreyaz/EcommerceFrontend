const fetchUserCart = async () => {
    const response = await axios.get('http://localhost:4000/api/v1/users/cart/get-cart', {
        withCredentials: true
    })
    return { data: response.data }
}

export {
    fetchUserCart
}