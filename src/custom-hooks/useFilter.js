import { useState, useCallback, useEffect } from "react"
import { useSelector } from "react-redux"
import { useMessageAndClear } from "./useMessageAndClear"
import { clearError, clearSuccess, fetchCategoriesAsync, fetchProductsAsync } from "../features/product-list/ProductSlice"

// a hook which gives products as per filter or sort
export const useFilter = () => {

    const { products, totalPages, filteredTotal, categories, status: productStatus } = useSelector(state => state.product)

    const executeAndMessage = useMessageAndClear('product', clearError, clearSuccess)

    const limit = 10

    const [filter, setFilter] = useState({ limit })

    const HandleFilterSelection = useCallback(
        (checked, field, value) => {
            setFilter((prevFilter) => {
                let newFilter = { ...prevFilter }
                if (field === 'page')
                    newFilter.page = value
                // when checked
                else if (checked) {
                    if (field === 'price') {
                        newFilter[field] = value.split(',')
                    }
                    if (field === 'category' || field === 'product_owners') {
                        (newFilter[field] ??= []).push(value)
                    }
                    if (field === 'discount') {
                        newFilter[field] = value
                    }
                }
                // when unchecked
                else {
                    if (field === 'category' || field === 'product_owners') {
                        const index = newFilter[field].indexOf(value)
                        newFilter[field].splice(index, 1)
                        if (!newFilter[field].length)
                            delete newFilter[field]
                    }
                    else {
                        delete newFilter[field]
                    }
                }
                return newFilter
            })
        },
        [],
    )

    const HandleSortSelection = useCallback(
        (field, order) => {

            setFilter((prevFilter) => {

                let newFilter = { ...prevFilter }

                // remove 
                if (newFilter.sort) {
                    // when the field to sort already exists then remove it
                    let index = newFilter.sort.findIndex(s => {
                        if (s.field === field) {
                            // when given field order not matches then add given field
                            if (s.order !== order)
                                newFilter.sort.push({ field, order })
                            return true
                        }
                        return false
                    })
                    // when the field exists then remove it
                    if (index !== -1)
                        newFilter.sort.splice(index, 1)
                    else
                        newFilter.sort.push({ field, order })
                }
                else
                    (newFilter.sort ??= []).push({ field, order })

                return newFilter
            }
            )
        },
        [],
    )

    const HandleFetchCategories = useCallback(
        () => {
            executeAndMessage(fetchCategoriesAsync)
        },
        [],
    )

    useEffect(() => {

        let queryString = '';

        // Helper function to append a parameter to the query string
        const appendParam = (key, value) => {
            if (value !== undefined && value !== '') {
                queryString += queryString ? `&&${key}=${value}` : `${key}=${value}`;
            }
        };

        // Process discount
        if (filter.discount)
            appendParam('discount', filter.discount);

        if (filter.limit)
            appendParam('limit', filter.limit)

        if (filter.page)
            appendParam('page', filter.page)

        // Process product_owners
        if (filter.product_owners && filter.product_owners.length > 0 && filter.product_owners[0] !== '') {
            appendParam('product_owners', filter.product_owners.join(','));
        }

        // Process category
        if (filter.category && filter.category.length > 0 && filter.category[0] !== '') {
            appendParam('category', filter.category.join(','));
        }

        // Process price
        if (filter.price && filter.price.length) {
            const [min, max] = filter.price;
            appendParam('min_price', min);
            if (max)
                appendParam('max_price', max);
        }

        // Process sort
        if (filter.sort && filter.sort.length > 0) {
            filter.sort.forEach(sortObj => {
                if (sortObj.field && sortObj.order) {
                    appendParam(`sort[${sortObj.field}]`, sortObj.order);
                }
            });
        }

        // console.log(queryString); // Output: discount=10&&product_owners=owner1,owner2&&category=smartphone,laptop&&min_price=10&&max_price=100&&sort[price]=1&&sort[rating]=-1

        executeAndMessage(fetchProductsAsync, queryString)
    }
        , [filter])

    return { products, categories, HandleFetchCategories, filteredTotal, totalPages, HandleFilterSelection, HandleSortSelection, productStatus }
}
