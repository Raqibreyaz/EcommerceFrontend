import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetailsAsync, clearError, clearSuccess } from "../features/product-list/ProductSlice";
import { useEffect } from "react";

export const useProduct = (id) => {

    const { currentProduct: product, error: productError, success: productSuccess, status: productStatus } = useSelector(state => state.product)
    const dispatch = useDispatch()

    const clearProductError = () => {
        dispatch(clearError())
    }
    const clearProductSuccess = () => {
        dispatch(clearSuccess())
    }

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

    // ran only 2 times due to strict mode
    useEffect(() => {
        // console.log('hi in product');
        dispatch(fetchProductDetailsAsync(id))
    }, [])

    return { product, productError, productSuccess, productStatus, clearProductError, clearProductSuccess, HandleDelete, checkStocks }
}
