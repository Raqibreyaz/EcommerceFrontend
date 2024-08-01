import React, { memo } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useAddNewAddressMutation, useFetchUserQuery } from '../../user/userSlice.js'
import { FailedMessage, Container, FormError } from '../../../components/index.js'
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage.js'

const AddressForm = memo(function () {

    const methods = useForm()

    const [AddNewAddress, { isLoading: isLoadingAddNewAddress }] = useAddNewAddressMutation()

    const { data: { user = null } = {}, isLoading: isLoadingUser } = useFetchUserQuery()

    const { formState: { errors, isSubmitting } } = methods

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
            <div className="border-b border-gray-900/10 pt-3 pb-5">
                <h2 className="text-xl font-semibold leading-7 text-gray-900">New Address</h2>
                <FormProvider {...methods}>
                    {/* <div className="my-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"> */}
                    <div className="my-7 flex flex-wrap gap-2">
                        {[
                            {
                                name: 'house no',
                                registerName: 'house_no',
                                className: "col-span-3"
                            },
                            {
                                name: 'city',
                                registerName: 'city',
                                className: "sm:col-span-2 "
                            },
                            {
                                name: 'state / province',
                                registerName: 'state',
                                className: "sm:col-span-2"
                            },
                            {
                                name: 'ZIP / Postal code',
                                registerName: 'pincode',
                                className: "sm:col-span-2"
                            },
                        ].map((obj) => (
                            <InputCard {...obj} />
                        ))}
                    </div>
                    <button type='button' className='p-2 bg-blue-600 rounded text-white'
                        onClick={methods.handleSubmit(onSubmit)}
                        disabled={Object.keys(errors).length > 0 && isSubmitting}
                    >Add Address</button>
                </FormProvider>
            </div>
        </Container>
    )
})

function InputCard({ name, registerName, className = '' }) {

    const { register } = useFormContext()

    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
                {name}
            </label>
            <div className="mt-2">
                <input
                    type="text"
                    {...register(registerName, { required: `${name} is required` })}
                    id={name}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                />
            </div>
            <FormError field={registerName} />
        </div>
    )
}

export default AddressForm
