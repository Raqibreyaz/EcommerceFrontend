import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../src/features/product-list/ProductSlice";
import userReducer from "../src/features/user/userSlice";

export const store = configureStore({
    reducer: {
        product: ProductReducer,
        user: userReducer,
    }
})