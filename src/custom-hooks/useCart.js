import { useEffect, useState, useCallback } from "react";
import { addProductToCartAsync, fetchUserCartAsync, clearError, clearSuccess } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMessageAndClear } from "./useMessageAndClear";

export const useCart = () => {

    const { status: cartStatus, userCart } = useSelector(state => state.cart)

    const executeAndMessage = useMessageAndClear('cart', clearError, clearSuccess)

    const AddToCart = useCallback(async (productId, color, size, quantity = 1) => {
        executeAndMessage(addProductToCartAsync,
            { productId, color, size, quantity },
            refreshCart)
    },
        []
    )

    // checks for if the product is added to cart
    const IsAddedToCart = useCallback(function (productId, color, size) {
        if (productId && color && size) {
            for (const prdct of userCart) {
                if (prdct.product === productId && color === prdct.color && size === prdct.size) {
                    return true
                }
            }
        }
        return false
    }, [])


    const [reload, setReload] = useState(false)

    function refreshCart() {
        console.log('cart refreshed');
        setReload(!reload)
    }

    // ran only 2 times due to strict mode
    useEffect(() => {
        executeAndMessage(fetchUserCartAsync)
    }, [reload])

    return { AddToCart, IsAddedToCart, cartStatus, userCart }
}
