import React, { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useAddNewAddressMutation, useFetchUserQuery } from '../../user/userSlice.js'
import { FailedMessage, Container } from '../../../components/index.js'
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage.js'

const AddressForm = memo(function() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

    const [AddNewAddress, { isLoading: isLoadingAddNewAddress }] = useAddNewAddressMutation()

    const { data: { user = null } = {}, isLoading: isLoadingUser } = useFetchUserQuery()

    // check validity and unique nature and then request to add
    const onSubmit = (data) => {
        //check for data exists in each field
        for (const field in data) {
            if (Object.hasOwnProperty.call(data, field)) {
                const value = data[field];
                if (!value)
                    return
            }
        }

        // check for data is unique
        let uniqueIndex = user.addresses.findIndex((addressObj) => (
            addressObj.house_no === data.house_no
            && addressObj.state === data.state
            && addressObj.city === data.city
            && addressObj.pincode === data.pincode
        ))
        if (uniqueIndex !== -1)
            FailedMessage('Address already exists')

        catchAndShowMessage(AddNewAddress, data)
    }

    return (
        <Container
            LoadingConditions={[isLoadingUser, isLoadingAddNewAddress]}
            RenderingConditions={[!!user]}
        >
            <div className="border-b border-gray-900/10 py-12">
                <h2 className="text-xl font-semibold leading-7 text-gray-900">New Address</h2>
                <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
        </Container>
    )
})

export default AddressForm
