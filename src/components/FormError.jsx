import React from 'react'

function FormError({ error, field }) {

    return (
        error[field] ?
            <span className='text-red-500 text-sm'>
                *{field} is required
            </span> : null
    )
}

export default FormError
