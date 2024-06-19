import React from 'react'

function FormError({ error, field }) {

    return (
        error ? (
            error[field] ?
                <span className='text-red-500 text-sm'>
                    *{field} is required
                </span> : null)
            : (<span className='text-red-500 text-sm'>
                *{field} is required
            </span>)
    )
}

export default FormError
