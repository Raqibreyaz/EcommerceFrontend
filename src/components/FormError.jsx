import React from 'react'
import { useFormContext } from 'react-hook-form'

function FormError({ error, field }) {

    const methods = useFormContext()

    if (!methods)
        return null

    const { formState: { errors } } = methods

    return (
        errors ? (
            errors[field] ?
                <span className='text-red-500 text-sm font-semibold'>
                    *{errors[field].message}
                </span> : null)
            : (<span className='text-red-500 text-sm font-semibold'>
                *{field} is required
            </span>)
    )
}

export default FormError
