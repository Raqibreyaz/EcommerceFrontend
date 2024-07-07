import { memo, useCallback, useEffect } from "react";
import { useFetchProductDetailsQuery } from "../features/product-list/ProductSlice";
import { useAddProductToWishlistMutation, useIsProductInWishlistQuery, useRemoveProductFromWishlistMutation } from "../features/wishlist/wishlistSlice";
import { useAddProductToCartMutation, useFetchUserCartQuery, useRemoveProductFromCartMutation } from "../features/cart/cartSlice";
import { useFetchUserQuery } from "../features/user/userSlice";


// product details
// reviews
// cart
// wishlist
export const useProduct = (id) => {

    const { data: { product = {} } = {}, isLoading: isLoadingProduct } = useFetchProductDetailsQuery(id)

    const { data: { isInWishlist = false } = {}, isLoading: isLoadingWishlist } = useIsProductInWishlistQuery(id)

    const { data: { userCart = [] } = {}, isLoading: isLoadingCart } = useFetchUserCartQuery()

    const { data: { user = {} } = {}, isLoadingUser } = useFetchUserQuery()

    const [AddToWishlist] = useAddProductToWishlistMutation()
    const [AddToCart] = useAddProductToCartMutation()
    const [RemoveFromWishlist] = useRemoveProductFromWishlistMutation()

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

    return { product, IsAddedToCart, AddToWishlist, AddToCart, RemoveFromWishlist, user, isInWishlist, isLoadingCart, isLoadingProduct, isLoadingUser, isLoadingWishlist }
}
