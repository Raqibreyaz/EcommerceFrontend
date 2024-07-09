import { memo, useCallback, useEffect } from "react";
import { useFetchProductDetailsQuery } from "../features/product-list/ProductSlice";
import { useAddProductToWishlistMutation, useIsProductInWishlistQuery, useRemoveProductFromWishlistMutation } from "../features/wishlist/wishlistSlice";
import { useAddProductToCartMutation, useFetchUserCartQuery } from "../features/cart/cartSlice";
import { useFetchUserQuery } from "../features/user/userSlice";
import { useFetchProductReviewsQuery } from "../features/reviews/reviewSlice";


// product details
// reviews
// cart
// wishlist
export const useProduct = (id) => {

    const { data: { product = {} } = {}, isLoading: isLoadingProduct } = useFetchProductDetailsQuery(id)

    const { data: { isInWishlist = false } = {}, isLoading: isLoadingWishlist } = useIsProductInWishlistQuery(id)

    const { data: { userCart = [] } = {}, isLoading: isLoadingCart } = useFetchUserCartQuery()

    const { data: { user = null } = {}, isLoadingUser } = useFetchUserQuery()

    const { data: { reviews = [] } = {}, isLoading: isLoadingReviews } = useFetchProductReviewsQuery(id) 

    const [AddToWishlist, { isLoading: isLoadingAddToWishlist, isSuccess: isSuccessfullInWishlist }] = useAddProductToWishlistMutation()

    const [AddToCart, { isLoading: isLoadingAddToCart, isSuccess: isSuccessfullInCart }] = useAddProductToCartMutation()

    const [RemoveFromWishlist, { isLoading: isLoadingRemoveFromWishlist, isSuccess: isSuccessfullRemoveFromWishlist }] = useRemoveProductFromWishlistMutation()

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
    }, [userCart])

    console.log(product);

    return {
        product,
        reviews,
        IsAddedToCart,
        AddToWishlist,
        AddToCart,
        RemoveFromWishlist,
        user,
        isInWishlist,
        isLoadingCart,
        isLoadingReviews,
        isLoadingProduct,
        isLoadingUser,
        isLoadingWishlist,
        isLoadingAddToCart,
        isLoadingAddToWishlist,
        isLoadingRemoveFromWishlist,
        isSuccessfullInCart,
        isSuccessfullInWishlist,
        isSuccessfullRemoveFromWishlist
    }
}
