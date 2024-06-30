import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../src/features/product-list/ProductSlice.js";
import userReducer from "../src/features/user/userSlice.js";
import cartReducer from '../src/features/cart/cartSlice.js'
import orderReducer from "../src/features/orders/orderSlice.js";
import wishlistReducer from "../src/features/wishlist/wishlistSlice.js";

export const store = configureStore({
    reducer: {
        product: ProductReducer,
        user: userReducer,
        cart: cartReducer,
        order: orderReducer,
        wishlist: wishlistReducer
    }
})