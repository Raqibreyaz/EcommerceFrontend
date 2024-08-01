import React, { memo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormError } from '../../../components/index.js'


const ExistingAddresses = memo(function ({ addresses }) {

    return (
        <div className='py-4'>
            <h1 className='text-lg font-semibold'>Address</h1>
            <p className='font-medium text-gray-500'>choose from existing addresses</p>
            <ul role="list" className="divide-y divide-gray-100">
                {addresses.map((address) => (
                    <AddressCard address={address} key={address._id} />
                ))}
            </ul>
            <FormError field={'deliveryAddress'} />
        </div>
    )
})

const AddressCard = memo(function ({ address }) {

    const { register } = useFormContext() ?? {}

    return (
        <li className="flex gap-x-6 py-5 items-center">
            <div className="flex items-center mt-2">
                <input
                    type="radio"
                    id={`address-${address._id}`}
                    value={JSON.stringify(address)}
                    {...register('deliveryAddress', { required: 'Please select a delivery address' })}
                    className="h-4 w-4 text-indigo-600 border-gray-300"
                />
                <label htmlFor={`address-${address._id}`} className="ml-2 block font-medium text-sm text-gray-900">{Object.values(address).slice(0, -1).reverse().join(' ')}</label>
            </div>
        </li >
    )
})

export default ExistingAddresses
