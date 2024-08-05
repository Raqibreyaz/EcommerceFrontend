import React, { useCallback, useState } from 'react'
import { Pagination } from '../../../components'
import { useDispatch } from 'react-redux'
import { updateFilterSelection } from '../../filter/filterSlice.js'

function PaginationHandler({ limit = 10, totalPages = 1, filteredTotal = 0 }) {

    const dispatch = useDispatch()

    const [page, setPage] = useState(1)

    const handlePageChange = useCallback(
        (index) => {
            setPage(index)
            // setting the page in filter
            dispatch(updateFilterSelection({ checked: false, field: 'page', value: index }))
        },
        [],
    )

    return (<Pagination PageChanger={handlePageChange} page={page} totalPages={totalPages} filteredTotal={filteredTotal} />)
}

export default PaginationHandler
