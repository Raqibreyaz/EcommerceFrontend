import { useMemo } from 'react'
import { useFetchUserCartQuery, useAddProductToCartMutation, useRemoveProductFromCartMutation } from '../features/cart/cartSlice.js'

export const useCart = () => {

    const { data: { userCart = [] } = {}, isLoading: isLoadingCart } = useFetchUserCartQuery()
    const [AddToCart] = useAddProductToCartMutation()
    const [RemoveFromCart] = useRemoveProductFromCartMutation()

    const subTotal = useMemo(() => {
        return userCart.reduce((acc, { price, quantity }) => acc + price * quantity, 0)
    }, [userCart])

    // total discount will be the memoized value in the useMemo fucntion
    const totalDiscount = useMemo(() => {
        return Math.round(userCart.reduce((acc, { price, quantity, discount }) => acc + price * discount * quantity / 100, 0));
    }, [userCart])

    return { AddToCart, RemoveFromCart, isLoadingCart, userCart, totalDiscount, subTotal }
}
