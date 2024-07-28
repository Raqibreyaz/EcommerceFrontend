import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useSelector } from 'react-redux';

export const productApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000/api/v1/products/',
    }),
    reducerPath: 'productApi',
    tagTypes: ['Products', 'Product', 'Categories'],
    keepUnusedDataFor: 60 * 30,
    endpoints: (build) => ({

        fetchProducts: build.query({
            query: (filter = '') => {
                return {
                    url: `get-products?${filter}`,
                    method: 'GET',
                }
            },
            providesTags: (result, error, filter) => {
                return [{ type: 'Products', id: filter }]
            },
        }),

        fetchCategories: build.query({
            query: () => ({
                url: 'category/get-categories',
                method: 'GET',
            }),
            // will cache all the categories
            providesTags: ['Categories'],
        }),

        fetchProductDetails: build.query({
            query: (id) => ({
                url: `get-product/${id}`,
                method: 'GET',
            }),
            // will cache the product details having the given id
            providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),

        addNewProduct: build.mutation({
            query: (productData) => ({
                url: 'addnew',
                method: 'POST',
                body: productData,
                credentials: 'include',
            }),
            // invalidate all the caches to refetch
            invalidatesTags: ['Products'],
        }),

        editProduct: build.mutation({
            query: ({ id, data }) => ({
                url: `edit-product/${id}`,
                method: 'PUT',
                body: data,
                credentials: 'include',
            }),
            // will refetch that particular product having that id
            invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
        }),

        deleteProduct: build.mutation({
            query: (id) => ({
                url: `delete-product/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Products'],
        }),

        addNewCategory: build.mutation({
            query: (category) => ({
                url: 'category/add-category',
                method: 'POST',
                body: { name: category },
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            }),
            invalidatesTags: ['Categories'],
        }),

        deleteCategory: build.mutation({
            query: (id) => ({
                url: `category/delete-category/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Categories'],
        }),
    }),

});

export const {
    useFetchProductsQuery,
    useFetchCategoriesQuery,
    useFetchProductDetailsQuery,
    useAddNewProductMutation,
    useEditProductMutation,
    useDeleteProductMutation,
    useAddNewCategoryMutation,
} = productApi;

