import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddressAsync } from '../features/user/userSlice.js'
import { FailedMessage } from './MessageDialog.jsx'

function AddressForm() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.userData)

    const onSubmit = (data) => {
        console.log(data);
        for (const field in data) {
            if (Object.hasOwnProperty.call(data, field)) {
                const value = data[field];
                if (!value)
                    return
            }
        }

        console.log(user);

        let checkUnique = user.addresses.filter((addressObj) => (
            addressObj.house_no === data.house_no
            && addressObj.state === data.state
            && addressObj.city === data.city
            && addressObj.pincode === data.pincode
        ))
        console.log(checkUnique);
        if (checkUnique.length)
            FailedMessage('Address already exists')

        dispatch(addNewAddressAsync(data))
    }

    return (
        <div className="border-b border-gray-900/10 py-12">
            <h2 className="text-xl font-semibold leading-7 text-gray-900">New Address</h2>
            <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                        full name
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            {...register('house_no')}
                            id="house_no"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div> */}
                <div className="col-span-3">
                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        House No
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            {...register('house_no')}
                            id="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            {...register('city')}
                            id="city"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            {...register('state')}
                            id="region"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            {...register('pincode')}
                            id="postal-code"
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <button type='button' className='p-2 bg-blue-600 rounded text-white'
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
            >Add Address</button>
        </div>
    )
}

export default AddressForm
