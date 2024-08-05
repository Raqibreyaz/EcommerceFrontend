import React, { memo } from 'react'
import { FormError } from '../../../components';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { TrashIcon } from '@heroicons/react/20/solid';

const Sizes = memo(() => {

    const { register, control } = useFormContext()

    const {
        fields: sizes,
        remove: removeSize,
        append: appendSize
    } = useFieldArray({
        control,
        name: 'sizes'
    })

    return (
        <div
            className="border p-4 rounded-lg space-y-4">
            <h2
                className="text-lg font-semibold">
                sizes
            </h2>
            <div>
                {sizes.map(({ size, id }, index) => (
                    <div
                        key={id}
                        className="flex space-x-2 mb-2 "
                    >
                        <input
                            type="text"
                            placeholder="Size"
                            className="border p-2 rounded w-full"
                            defaultValue={size}
                            {...register(`sizes[${index}].size`, { required: "size is required" })}
                        />
                        <FormError field={'sizes'} index={index} subField='size' />

                        {/* button to remove size */}
                        {sizes.length > 1 &&
                            <button
                                type="button"
                                onClick={() => removeSize(index)}
                                className="text-red-500 text-sm">
                                <TrashIcon className='size-5'/>
                            </button>}
                    </div>
                ))}
                {/* button to add new size */}
                <button
                    type="button"
                    onClick={() => appendSize({ size: '' })}
                    className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
                >
                    Add Size
                </button>
            </div >
        </div>
    )
})

export default Sizes
