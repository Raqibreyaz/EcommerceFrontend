import React from 'react'
import { Controller } from 'react-hook-form'
import FormError from '../../../components/FormError'

function PaymentMethods({ control }) {
    return (
        <div>
            <h1 className='text-lg capitalize font-semibold '>payment methods</h1>
            <p className='text-gray-500'>choose one</p>
            <div className='font-semibold text-sm mt-5 flex flex-col gap-3'>
                <Method control={control} methodName={'cash'} />
                <Method control={control} methodName={'credit card'} />
                <FormError field={'paymentMode'}/>
            </div>
        </div>
    )
}

function Method({ control, methodName }) {
    return (
        <div className='flex gap-1 capitalize'>
            <Controller
                control={control}
                name='paymentMode'
                rules={{ required: "a payment mode is required!!" }}
                render={({ field: { onChange, onBlur, value, ref }, formState: { errors }, fieldState }) => (
                    <>
                        <input type="radio"
                            onChange={onChange}
                            onBlur={onBlur}
                            ref={ref}
                            value={methodName}
                            name='paymentMode'
                            id={methodName} />
                    </>
    )} />
            < label htmlFor={methodName}>{methodName}</label>
        </div>
    )
}

export default PaymentMethods
