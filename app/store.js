import { configureStore } from "@reduxjs/toolkit";
import { userApi } from '../src/features/user/userSlice.js'
import { productApi } from "../src/features/product-list/ProductSlice.js";
import { cartApi } from "../src/features/cart/cartSlice.js";
import { orderApi } from "../src/features/orders/orderSlice.js";
import { productReviewApi } from "../src/features/reviews/reviewSlice.js";
import { wishlistApi } from "../src/features/wishlist/wishlistSlice.js";
import dashboardApi from "../src/features/dashboard/dashboardSlice.js";
import filterReducer from "../src/features/filter/filterSlice.js";

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [productReviewApi.reducerPath]: productReviewApi.reducer,
        [wishlistApi.reducerPath]: wishlistApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,
        filter: filterReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(
            userApi.middleware,
            productApi.middleware,
            cartApi.middleware,
            orderApi.middleware,
            productReviewApi.middleware,
            wishlistApi.middleware,
            dashboardApi.middleware
        )
})
