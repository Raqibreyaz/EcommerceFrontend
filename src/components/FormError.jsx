import React, { useCallback, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

function FormError({ field, index = 0, subField = '' }) {

    const methods = useFormContext()

    if (!methods)
        return null

    const { formState: { errors } } = methods
    // {colors:[{mainImage:{message}}]}

    const checker = useCallback(() => {
        if (errors && errors[field] && !subField)
            return true
        if (errors &&
            errors[field] &&
            subField &&
            errors[field].length > index &&
            errors[field][index] &&
            errors[field][index][subField])
            return true

        return false
    }, [field, index, subField, errors])

    return (
        checker() ?
            (<span className='text-red-500 text-sm max-sm:text-xs font-semibold'>
                *{
                    checker() && subField ?
                        errors[field][index][subField]?.message :
                        errors[field].message
                }
            </span>) : null)
}

export default FormError
