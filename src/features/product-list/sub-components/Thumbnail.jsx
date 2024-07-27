import React, { memo, useEffect } from 'react'
import { FormError, ImageSection } from '../../../components'
import { useFormContext } from 'react-hook-form'

const Thumbnail = memo(() => {
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
                {...register('thumbnail', { required: "thumbnail is required!!", validate: (files) => files.length === 1 || "thumbnail is required for product" })}
                accept='image/*'
            />
            <ImageSection files={thumbnail} />
            <FormError field={'thumbnail'} />
        </div>
    )
})

export default Thumbnail
