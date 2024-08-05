// checks for if the product is added to cart
export const IsAddedToCart = function (productId, color, size, userCart) {
    if (productId && color && size && userCart && Array.isArray(userCart)) {
        for (const prdct of userCart) {
            if (prdct.product === productId && color === prdct.color && size === prdct.size) {
                return true
            }
        }
    }
    return false
}