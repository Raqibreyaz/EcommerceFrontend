import React, { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormError } from '../../../components'
import { useFetchCategoriesQuery } from '../ProductSlice'

const PriceDiscountCategory = memo(() => {

    const { register } = useFormContext()

    const { data: { categories = [] } = {}, isLoading: isLoadingCategories } = useFetchCategoriesQuery()

    return (
        <div className='flex flex-wrap gap-2 items-center'>
            {
                [
                    {
                        name: "price",
                        cond: {
                            required: "price is required!!",
                            min: {
                                value:1,
                                message:"min value of price should be 1"
                            }
                        }
                    },
                    { name: "discount", cond: { required: false, min: { value: 0 } } }
                ].map(({ name, cond }) => (
                    <div key={name} >
                        <label htmlFor={name} className='font-semibold'>{name}: </label>
                        <input
                            type="number"
                            {...register(name, cond)}
                            placeholder={name}
                            id={name}
                            className='border p-2 rounded w-[100%]'
                        />
                        <FormError field={name} />
                    </div>
                ))
            }
            <div>
                <label htmlFor="category" className='font-semibold block'>Category: </label>
                <select
                    {...register('category',
                        {
                            required: "category is required"
                        })}
                    className='border p-2 rounded'
                    id='category'
                >
                    {
                        categories.map((category) => (
                            <option key={category._id} value={category.name}>{category.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
})

export default PriceDiscountCategory