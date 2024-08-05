import React, { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormError } from '../../../components'

const DescriptionDetailsReturnPolicy = memo(() => {

    const { register} = useFormContext()

    return (
        <div className='space-y-4'>
            {
                [
                    { name: 'description', registerName: "description" },
                    { name: 'details', registerName: "details" },
                    { name: 'return policy', registerName: "returnPolicy" },
                ].map(({ name, registerName }) => (
                    <div key={name} className="flex flex-col">
                        <label htmlFor={name} className='capitalize font-semibold'>{name}: </label>
                        <textarea
                            rows={4}
                            className="border p-2 rounded resize-none placeholder:capitalize"
                            id={name}
                            placeholder={name}
                            {...register(registerName, {
                                required: `${name} is required`, minLength: {
                                    value: 10,
                                    message: `${name} should be at least 10 characters`
                                }
                            })}
                        ></textarea>
                        <FormError field={registerName} />
                    </div>
                ))
            }
        </div>
    )
})

export default DescriptionDetailsReturnPolicy
