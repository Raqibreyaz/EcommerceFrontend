import React, { memo, useEffect } from 'react'
import { FormError, ImageSection } from '../../../components'
import { useFormContext } from 'react-hook-form'

const Thumbnail = memo(({ isEditing = false }) => {
    
    const { watch, register } = useFormContext()

    const thumbnail = watch('thumbnail')

    return (
        <div className='border p-2 rounded flex gap-2'>
            <label
                htmlFor="thumbnail"
                className='font-semibold mr-1'>
                Thumbnail:
            </label>
            <input
                id='thumbnail'
                type="file"
                {...register('thumbnail', thumbnail ? {} : { required: "thumbnail is required" })}
                accept='image/*'
            />
            <ImageSection field={'thumbnail'} removeOption={isEditing} />
            <FormError field={'thumbnail'} />
        </div>
    )
})

export default Thumbnail
