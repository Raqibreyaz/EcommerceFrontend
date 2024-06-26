import React from 'react'
import { Controller } from 'react-hook-form'

function ExistingAddresses({ people, control }) {
    return (
        <div>
            <h1 className='text-lg font-semibold'>Address</h1>
            <p className='font-thin text-gray-500'>choose from existing addresses</p>
            <ul role="list" className="divide-y divide-gray-100">
                {people.map((person) => (
                    <AddressCard person={person} key={person.id} />
                ))}
            </ul>
        </div>
    )
}

function AddressCard({ person, control }) {
    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4 items-start">
                <Controller
                    control={control}
                    name='deliveryAddress'
                    render={({ field: { onChange, onBlur, checked, ref } }) => (
                        <input type="radio"
                            onChange={onChange}
                            onBlur={onBlur}
                            checked={checked}
                            ref={ref}
                        />
                    )}
                />
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.street}</p>
                    <div className='text-gray-400 text-xs'>{person.pinCode}</div>
                </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <div className="mt-1 flex flex-col gap-x-1.5 text-gray-500">
                    <div className='font-semibold text-md'>{person.state}</div>
                    <div className='font-semibold text-sm'>{person.city}</div>
                </div>
            </div>
        </li>
    )
}

export default ExistingAddresses
