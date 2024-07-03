import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetailsAsync, clearError, clearSuccess } from "../features/product-list/ProductSlice";
import { memo, useCallback, useEffect } from "react";
import { useMessageAndClear } from "./useMessageAndClear";

export const useProduct = (id) => {

    const { currentProduct: product, status: productStatus } = useSelector(state => state.product)

    const executeAndMessage = useMessageAndClear('product', clearError, clearSuccess)

    const CreateNewProduct = useCallback(() => {

    }
        , [])

    const EditProduct = useCallback(() => {

    }
        , [])

    // works on deleting the product
    const HandleDelete = async () => {
        let result = await showConfirmation('Delete Product', 'Do You Really Want To Delete the Product')
        if (result.isConfirmed)
            SuccessMessage('product deleted successfully')
        if (result.isDenied)
            SuccessMessage('something went wrong')
    }

    const checkStocks = (color, size) => {
        for (const stockObj of product.stocks) {
            if (stockObj.color === color && stockObj.size === size) {
                return stockObj.stock > 0
            }
        }
        return false
    }

    // console.log('in useProduct');

    // ran only 2 times due to strict mode
    useEffect(() => {
        executeAndMessage(fetchProductDetailsAsync, id)
        console.log('useProduct useEffect');
    }, [])

    return { product, productStatus, HandleDelete, checkStocks }
}
