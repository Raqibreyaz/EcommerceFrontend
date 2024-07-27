import React, { memo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormError } from '../../../components';

const KeyHighlightCard = memo(function ({ highlight, noOfHighlights, index, removeHighlights }) {

    const { register } = useFormContext()

    return (
        <div className='space-x-1'>
            <input
                {...register(
                    `keyHighlights[${index}].highlight`,
                    {
                        required: "provide at least 1 key highlight"
                    })}
                type="text"
                className='border rounded p-1 w-[90%]' placeholder='Highlight'
            />
            {/* button to remove highlight  */}
            {noOfHighlights > 1 &&
                <button
                    type='button'
                    className='text-red-500 text-sm'
                    onClick={() => removeHighlights(index)}
                >
                    Remove
                </button>
            }
            <FormError field={`keyHighlights`} index={index} subField='highlight' />
        </div>
    )
})

const KeyHighlights = memo(() => {

    const { control } = useFormContext()

    const { fields: highlightFields, append: appendHighlights, remove: removeHighlights } = useFieldArray({
        control,
        name: 'keyHighlights',
    });

    return (
        <div className='border p-2 space-y-2'>
            <label className='font-semibold'>Key Highlights:</label>
            {
                highlightFields.map((highlight, index) => (
                    <KeyHighlightCard
                        key={highlight.id}
                        highlight={highlight}
                        noOfHighlights={highlightFields.length}
                        index={index}
                        removeHighlights={removeHighlights} />
                ))
            }
            {/* button to add new highlight */}
            <button
                type='button'
                className='bg-blue-500 text-white p-2 rounded block text-sm'
                onClick={() => appendHighlights({ highlight: '' })}
            >
                Add Highlight
            </button>
        </div>
    )
}
)

export default KeyHighlights
