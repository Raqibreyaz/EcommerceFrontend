import React from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Container, FormError } from '../../../components';
import { useParams } from 'react-router-dom';
import { useCreateReturnRequestMutation } from '../orderSlice';
import { useFetchUserQuery } from '../../user/userSlice';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage';

const addresses = [
    '123 Main St, Apt 4B, New York, NY 10001, USA',
    '456 Elm St, Apt 2A, San Francisco, CA 94103, USA',
    '789 Oak St, Apt 3C, Chicago, IL 60601, USA',
];

const ReturnRequestForm = () => {

    // product id is the _id of the product in the products array
    const { orderId, productId } = useParams()

    const [CreateReturnRequest, { isLoading: isCreatingReturnRequest }] = useCreateReturnRequestMutation()

    const { data: { user = null } = {}, isLoading: isFetchingUser } = useFetchUserQuery()

    const methods = useForm()

    const { register, handleSubmit, control, watch } = methods;

    const onSubmit = data => {
        catchAndShowMessage(CreateReturnRequest, { data: { ...data, productId }, orderId })
    }


    const imageFiles = watch('productReturnImages');

    return (
        <Container
            className="container mx-auto p-4 max-w-lg"
            LoadingConditions={[!!isCreatingReturnRequest, !!isFetchingUser]}
        >
            <h1 className="text-2xl font-bold mb-4">Return Order</h1>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* reason */}
                    <div>
                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Return</label>
                        <textarea
                            id="reason"
                            {...register('reason', { required: "you must fully describe your reason at least 25 characters", minLength: 25 })}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                            rows="4"
                        ></textarea>
                        <FormError field={'reason'} />
                    </div>

                    {/* images */}
                    <div>
                        <label htmlFor="productReturnImages" className="block text-sm font-medium text-gray-700">Upload Images (3-5)</label>
                        <input
                            id="productReturnImages"
                            type="file"
                            {...register('productReturnImages', {
                                required: 'Please upload between 3 to 5 images',
                                validate: files => files.length >= 3 && files.length <= 5 || 'You must upload between 3 and 5 images'
                            })}
                            accept="image/*"
                            multiple
                            className="mt-1 block w-full text-sm text-gray-500"
                        />
                        <FormError field={'images'} />
                        {imageFiles && imageFiles.length > 0 && (
                            <ul className="mt-2">
                                {Array.from(imageFiles).map((file, index) => (
                                    <li key={index} className="text-sm text-gray-700">{file.name}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* to replace checkbox */}
                    <div className="flex items-center">
                        <input
                            id="toReplace"
                            type="checkbox"
                            {...register('toReplace')}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label htmlFor="toReplace" className="ml-2 block text-sm text-gray-900">Replace item?</label>
                    </div>

                    {/* addresses list to choose a pickup address */}
                    <div>
                        <p className="block text-sm font-medium text-gray-700">Pickup Address</p>
                        {user?.addresses.map((address, index) => (
                            <div key={address._id} className="flex items-center mt-2">
                                <input
                                    type="radio"
                                    id={`address-${index}`}
                                    value={JSON.stringify(address)}
                                    {...register('pickupAddress', { required: 'Please select a pickup address' })}
                                    className="h-4 w-4 text-indigo-600 border-gray-300"
                                />
                                <label htmlFor={`address-${index}`} className="ml-2 block text-sm text-gray-900">{Object.values(address).slice(0, -1).reverse().join(' ')}</label>
                            </div>
                        ))}
                        <FormError field={'pickupAddress'} />
                    </div>

                    <button type="submit" className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </form>
            </FormProvider>

        </Container>
    );
};

export default ReturnRequestForm;
