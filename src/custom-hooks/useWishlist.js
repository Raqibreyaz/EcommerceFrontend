import { useEffect, useState } from "react";
import { fetchWishlistAsync, addProductToWishlistAsync, removeProductFromWishlistAsync, clearError, clearSuccess } from "../features/wishlist/wishlistSlice.js";
import { useDispatch, useSelector } from "react-redux";

export const useWishlist = () => {

    const { success: wishlistSuccess, error: wishlistError, status: wishlistStatus, wishlistData } = useSelector(state => state.wishlist)

    const dispatch = useDispatch()

    const AddToWishlist = async (productId, color, size) => {
        console.log(color);
        console.log(size);
        console.log(productId);
        return await dispatch(addProductToWishlistAsync({ id: productId, data: { color, size } })).unwrap()
    }

    const RemoveFromWishlist = async (productId, color, size) => {
        console.log(color);
        console.log(size);
        console.log(productId);
        return await dispatch(removeProductFromWishlistAsync({ id: productId, data: { color, size } })).unwrap()
    }

    const IsAddedToWishlist = (productId) => {
        if (productId) {
            for (const prdct of wishlistData) {
                if (prdct.productId === productId) {
                    return true
                }
            }
        }
        return false
    }


    const clearWishlistError = () => {
        dispatch(clearError())
    }
    const clearWishlistSuccess = () => {
        dispatch(clearSuccess())
    }

    const [reload, setReload] = useState(false)

    const refreshWishlist = () => {
        setReload(!reload)
    }

    // ran only 2 times due to strict mode
    useEffect(() => {
        dispatch(fetchWishlistAsync())
    }, [reload])

    return {
        AddToWishlist,
        RemoveFromWishlist,
        wishlistSuccess,
        wishlistError,
        clearWishlistError,
        clearWishlistSuccess,
        wishlistStatus,
        wishlistData,
        refreshWishlist,
        IsAddedToWishlist
    }
}