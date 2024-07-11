import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    initialState: {
        filter: { limit: 10 },
    },
    name: 'filter',
    reducers: {
        updateFilterSelection: (state, action) => {
            const field = action.payload.field
            const checked = action.payload.checked
            const value = action.payload.value

            let newFilter = { ...state.filter }
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
            state.filter = newFilter
        },
        updateSortSelection: (state, action) => {

            const field = action.payload.field
            const order = action.payload.order

            let newFilter = { ...state.filter }

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

            state.filter = newFilter
        },
    }
})

export const { updateFilterSelection, updateSortSelection } = filterSlice.actions

export default filterSlice.reducer
