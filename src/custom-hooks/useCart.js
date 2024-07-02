import { useEffect, useState, useCallback, useMemo } from "react";
import { addProductToCartAsync, fetchUserCartAsync, clearError, clearSuccess, removeProductFromCartAsync } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMessageAndClear } from "./useMessageAndClear";

export const useCart = () => {

    const { status: cartStatus, userCart } = useSelector(state => state.cart)

    const [reload, setReload] = useState(false)

    const subTotal = useMemo(() => {
        return userCart.reduce((acc, { price, quantity }) => acc + price * quantity, 0)
    }, [userCart])

    // total discount will be the memoized value in the useMemo fucntion
    const totalDiscount = useMemo(() => {
        return Math.round(userCart.reduce((acc, { price, quantity, discount }) => acc + price * discount * quantity / 100, 0));
    }, [userCart])

    const refreshCart = useCallback(function () {
        console.log("reloading cart");
        setReload(!reload)
    }, [])

    // returns a function
    const executeAndMessage = useMessageAndClear('cart', clearError, clearSuccess)

    const AddToCart = useCallback(async (productId, color, size, quantity = 1) => {
        executeAndMessage(addProductToCartAsync,
            { id: productId, data: { color, size, quantity } },
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

    const RemoveFromCart = useCallback(
        (productId, color, size) => {
            executeAndMessage(removeProductFromCartAsync,
                { id: productId, data: { color, size } },
                refreshCart)
        },
        [],
    )

    console.log('in useCart ');
    // ran only 2 times due to strict mode
    useEffect(() => {
        executeAndMessage(fetchUserCartAsync)
        console.log('useCart useEffect');
    }, [reload])

    return { AddToCart, IsAddedToCart, RemoveFromCart, cartStatus, userCart, totalDiscount, subTotal }
}
