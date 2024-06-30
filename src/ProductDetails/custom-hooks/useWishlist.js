import { useEffect, useState } from "react";
import { fetchWishlistAsync, addProductToWishlistAsync, removeProductFromWishlist, clearError, clearSuccess } from "../../features/wishlist/wishlistSlice.js";
import { useDispatch, useSelector } from "react-redux";

export const useWishlist = () => {

    const { success: wishlistSuccess, error: wishlistError, status: wishlistStatus, wishlistData } = useSelector(state => state.wishlist)

    const dispatch = useDispatch()

    const AddToWishlist = (productId, color, size) => {
        console.log(color);
        console.log(size);
        console.log(productId);
    }

    const RemoveFromWishlist = (productId, color, size) => {
        console.log(color);
        console.log(size);
        console.log(productId);
    }

    const IsAddedToWishlist = (productId) => {
        for (const prdct of wishlistData) {
            if (prdct.product === productId) {
                return true
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