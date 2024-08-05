import React, { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormError } from '../../../components'

const ProductName = memo(function () {

    const { register } = useFormContext()

    return (
        <div className="flex flex-col">
            <label htmlFor="productName" className='font-semibold'>Product Name: </label>
            <input
                type="text"
                className="border p-2 rounded placeholder:capitalize" id='productName'
                placeholder='product name'
                {...register('product_name', { required: "product name is required" })}
            />
            <FormError field={'product_name'} />
        </div>
    )
})

export default ProductName
