import { useEffect, useState } from "react";
import { addProductToCartAsync, fetchUserCartAsync, clearError, clearSuccess } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export const useCart = () => {
    const { success: cartSuccess, error: cartError, status: cartStatus, userCart } = useSelector(state => state.cart)

    const dispatch = useDispatch()

    const AddToCart = async (productId, color, size, quantity = 1) => {
        let data = {
            productId,
            color,
            size,
            quantity
        }
        return await dispatch(addProductToCartAsync(data)).unwrap()
    }

    // checks for if the product is added to cart
    function IsAddedToCart(productId, color, size) {
        for (const prdct of userCart) {
            if (prdct.product === productId && color === prdct.color && size === prdct.size) {
                return true
            }
        }
        return false
    }

    const clearCartError = () => {
        dispatch(clearError())
    }
    const clearCartSuccess = () => {
        dispatch(clearSuccess())
    }

    const [reload, setReload] = useState(false)

    const refreshCart = () => {
        setReload(!reload)
    }

    useEffect(() => {
        dispatch(fetchUserCartAsync())
    }, [reload])

    return { AddToCart, IsAddedToCart, cartSuccess, cartError, cartStatus, userCart, clearCartError, clearCartSuccess, refreshCart }
}
