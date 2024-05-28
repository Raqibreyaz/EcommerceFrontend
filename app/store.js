import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../src/features/product-list/ProductSlice";

export const store = configureStore({
    reducer: {
        product: ProductReducer
    }
})