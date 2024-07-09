// import { useState, useCallback, useEffect, useMemo } from "react"
// import { useFetchProductsQuery, useFetchCategoriesQuery } from "../features/product-list/ProductSlice"
// import { useFetchProductOwnersQuery } from "../features/user/userSlice"

// // a hook which gives products as per filter or sort
// export const useFilter = () => {

//     const [filter, setFilter] = useState({ limit: 10 })

//     // every time when filter change will create the query string 
//     const getQueryString = useCallback(
//         () => {
//             let queryString = ''
//             // Helper function to append a parameter to the query string
//             const appendParam = (key, value) => {
//                 if (value !== undefined && value !== '') {
//                     queryString += queryString ? `&&${key}=${value}` : `${key}=${value}`;
//                 }
//             };

//             // Process discount
//             if (filter.discount)
//                 appendParam('discount', filter.discount);

//             if (filter.limit)
//                 appendParam('limit', filter.limit)

//             if (filter.page)
//                 appendParam('page', filter.page)

//             // Process product_owners
//             if (filter.product_owners && filter.product_owners.length > 0 && filter.product_owners[0] !== '') {
//                 appendParam('product_owners', filter.product_owners.join(','));
//             }

//             // Process category
//             if (filter.category && filter.category.length > 0 && filter.category[0] !== '') {
//                 appendParam('category', filter.category.join(','));
//             }

//             // Process price
//             if (filter.price && filter.price.length) {
//                 const [min, max] = filter.price;
//                 appendParam('min_price', min);
//                 if (max)
//                     appendParam('max_price', max);
//             }

//             // Process sort
//             if (filter.sort && filter.sort.length > 0) {
//                 filter.sort.forEach(sortObj => {
//                     if (sortObj.field && sortObj.order) {
//                         appendParam(`sort[${sortObj.field}]`, sortObj.order);
//                     }
//                 });
//             }

//             // console.log(queryString); // Output: discount=10&&product_owners=owner1,owner2&&category=smartphone,laptop&&min_price=10&&max_price=100&&sort[price]=1&&sort[rating]=-1
//             return queryString
//         },
//         [filter],
//     )

//     const { data: { products = [], totalPages = 0, filteredTotal = 0 } = {}, isLoading: isLoadingProducts } = useFetchProductsQuery(query, {
//         refetchOnMountOrArgChange: false
//     })

//     console.log(products);
//     return { products, isLoadingProducts, filteredTotal, totalPages, getQueryString, HandleFilterSelection, HandleSortSelection }
// }
