import React from 'react'
import { Controller } from 'react-hook-form'
import FormError from '../../../components/FormError'

function ExistingAddresses({ addresses, control, user }) {

    addresses = addresses.map(({ state, city, pincode, house_no }) => (
        {
            fullname: user.fullname,
            house_no,
            pincode,
            city,
            state,
            id: Date.now() + Math.random()
        }
    ))
    return (
        <div>
            <h1 className='text-lg font-semibold'>Address</h1>
            <p className='font-thin text-gray-500'>choose from existing addresses</p>
            <ul role="list" className="divide-y divide-gray-100">
                {addresses.map((address) => (
                    <AddressCard address={address} key={address.id} control={control} />
                ))}
            </ul>
            <FormError field={'deliveryAddress'} />
        </div>
    )
}

function AddressCard({ address, control }) {
    return (
        <li className="flex gap-x-6 py-5 items-center">
            <div className="flex min-w-0 gap-x-4 items-start">
                <Controller
                    control={control}
                    name='deliveryAddress'
                    rules={{ required: 'choose an address' }}
                    render={({ field: { onChange, onBlur, ref }, formState: { errors } }) => (
                        <input type="radio"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={JSON.stringify(address)}
                            ref={ref}
                            name='deliveryAddress'
                            id={`address.${address.house_no}`}
                        />
                    )}
                />
            </div>
            <label htmlFor={`address.${address.house_no}`} className='flex  justify-between w-full'>
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{address.fullname}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.house_no}</p>
                    <div className='text-gray-400 text-xs'>{address.pincode}</div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <div className="mt-1 flex flex-col gap-x-1.5 text-gray-500">
                        <div className='font-semibold text-md'>{address.state}</div>
                        <div className='font-semibold text-sm'>{address.city}</div>
                    </div>
                </div>
            </label>

        </li >
    )
}

export default ExistingAddresses
