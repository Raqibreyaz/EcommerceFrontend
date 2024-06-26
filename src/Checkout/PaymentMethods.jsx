import React from 'react'
import { Controller } from 'react-hook-form'

function PaymentMethods({ control }) {
    return (
        <div>
            <h1 className='text-lg capitalize font-semibold '>payment methods</h1>
            <p className='text-gray-500'>choose one</p>
            <div className='font-semibold text-sm mt-5 flex flex-col gap-3'>
                <div className='flex gap-1 capitalize'>
                    <Controller
                        control={control}
                        name='paymentMode'
                        render={({ field: { onChange, onBlur, value, ref,checked } }) => (
                            <input
                                type='radio'
                                onChange={onChange} // send value to hook form
                                onBlur={onBlur} // notify when input is touched
                                checked={checked}
                                ref={ref}
                                id='cash'// set ref for focus management
                            />
                        )}

                    />
                    <label htmlFor="cash">cash</label>
                </div>
                <div className='flex gap-1 capitalize'>
                    <Controller
                        control={control}
                        name='paymentMode'
                        render={({ field, field: { onChange, onBlur, value, ref ,checked}, formState, fieldState }) => (
                            <input type="radio"
                                onChange={onChange}
                                onBlur={onBlur}
                                checked={checked}
                                ref={ref}
                                id='credit card' />
                        )} />
                    < label htmlFor="credit card">credit card</label>
                </div>
                <button></button>
            </div>
        </div>
    )
}

export default PaymentMethods
