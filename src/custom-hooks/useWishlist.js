import { useEffect, useState, useCallback } from "react";
import { fetchWishlistAsync, addProductToWishlistAsync, removeProductFromWishlistAsync, clearError, clearSuccess } from "../features/wishlist/wishlistSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useMessageAndClear } from "./useMessageAndClear.js";

export const useWishlist = () => {

    const { status: wishlistStatus, wishlistData } = useSelector(state => state.wishlist)

    const executeAndMessage = useMessageAndClear('wishlist', clearError, clearSuccess)

    const [reload, setReload] = useState(false)

    const refreshWishlist = useCallback(function () {
        setReload(!reload)
    }, [])

    const AddToWishlist = useCallback(
        (productId, color, size) => {
            console.log(color);
            console.log(size);
            console.log(productId);
            executeAndMessage(addProductToWishlistAsync, { id: productId, data: { color, size } }, refreshWishlist)
        },
        [],
    )

    const RemoveFromWishlist = useCallback(
        (productId, color, size) => {
            console.log(color);
            console.log(size);
            console.log(productId);
            executeAndMessage(removeProductFromWishlistAsync, { id: productId, data: { color, size } }, refreshWishlist)
        },
        []
    )

    const IsAddedToWishlist = useCallback(
        (productId) => {
            if (productId) {
                for (const prdct of wishlistData) {
                    if (prdct.productId === productId) {
                        return true
                    }
                }
            }
            return false
        },
        []
    )


    // ran only 2 times due to strict mode
    useEffect(() => {
        executeAndMessage(fetchWishlistAsync)
        console.log('useWishlist useEffect');
    }, [reload])

    // console.log('in useWishlist ');

    return {
        AddToWishlist,
        RemoveFromWishlist,
        wishlistStatus,
        wishlistData,
        IsAddedToWishlist
    }
}