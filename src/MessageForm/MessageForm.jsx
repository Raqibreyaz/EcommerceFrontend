import React, { useCallback, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Container, FormError } from '../components/index.js'
import { useCreateMessageMutation } from '../features/dashboard/dashboardSlice.js';
import { useNavigate } from 'react-router-dom';
import { catchAndShowMessage } from '../utils/catchAndShowMessage.js';

const MessageForm = () => {

    const methods = useForm()

    const Navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = methods

    const [CreateMessage, { isLoading: isCreatingMessage, isSuccess: isSuccessFullyCreatedMessage }] = useCreateMessageMutation()

    const onSubmit = useCallback(
        (data) => {
            catchAndShowMessage(CreateMessage, data)
        },
        [],
    )

    // after creating message go to home
    useEffect(() => {
        if (isSuccessFullyCreatedMessage)
            Navigate('/')
    }, [isSuccessFullyCreatedMessage])

    return (
        <Container
            LoadingConditions={[!!isCreatingMessage]}
        >
            <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
                <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="subject">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                className={`w-full px-3 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                {...register('subject',
                                    {
                                        required: 'subject is required',
                                        minLength: {
                                            value: 10,
                                            message: "subject should be more than 10 characters"
                                        },
                                        maxLength: {
                                            value: 100,
                                            message: "subject should be under 100 characters"
                                        },
                                    })}
                            />
                            <FormError field={'subject'} />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                className={`w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                {...register('description',
                                    {
                                        required: 'description is required',
                                        minLength: {
                                            value: 50,
                                            message: 'description should be more than 50 characters'
                                        },
                                        maxLength: {
                                            value: 200,
                                            message: 'description should be under 200 characters'
                                        },
                                    })}
                            />
                            <FormError field={'description'} />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
                        >
                            Submit
                        </button>
                    </form>
                </FormProvider>
            </div>
        </Container>
    );
};

export default MessageForm;

