import React, { memo } from 'react'
import { useFormContext } from 'react-hook-form'

const IsReturnable = memo(() => {
    const { register } = useFormContext()

    return (
        <div>
            <input
                type='checkbox'
                {...register('isReturnable')}
                defaultChecked={true}
                className='mr-1'
                id='isReturnable' />
            <label
                htmlFor='isReturnable' className='text-sm'>
                Returnable
            </label>
        </div>
    )
})

export default IsReturnable
