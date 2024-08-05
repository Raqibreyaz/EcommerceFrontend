import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Container, FormError } from '../../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage';
import { useResetPasswordMutation, useVerifyPasswordResetTokenMutation } from '../userSlice';

const ResetPassword = () => {

    const methods = useForm();

    const Navigate = useNavigate();

    const token = (new URLSearchParams(useLocation().search)).get('token')

    const [userId, setUserId] = useState('')

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = methods

    const [VerifyPasswordResetToken, { isLoading: isVerifyingResetToken, isError: isFailedToVerifyToken }] = useVerifyPasswordResetTokenMutation()

    const [ResetUserPassword, { isLoading, isSuccess }] = useResetPasswordMutation()

    const onSubmit = (data) => {
        data.userId = userId
        console.log(data);
        catchAndShowMessage(ResetUserPassword, data)
    };

    const newPassword = watch('newPassword');

    useEffect(() => {
        if (isSuccess) {
            Navigate('/login')
        }
    }, [isSuccess])

    useEffect(() => {
        catchAndShowMessage(VerifyPasswordResetToken, { token }, false)
            .then((data) => {
                if (data) {
                    console.log('user id', data.userId);
                    setUserId(data.userId)
                }
            })
    }, [])

    return (
        <Container
            LoadingConditions={[isLoading, isVerifyingResetToken]}
            RenderingConditions={[!isFailedToVerifyToken, !isVerifyingResetToken, !!userId]}
        >
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                        Reset Password
                    </h2>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    {...register('newPassword', {
                                        required: 'New Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters long'
                                        }
                                    })}
                                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                <FormError field={'newPassword'} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    {...register('confirmPassword', {
                                        required: 'Please confirm your password',
                                        validate: value =>
                                            value === newPassword || 'Passwords do not match'
                                    })}
                                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                <FormError field={'confirmPassword'} />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                disabled={isLoading || isSubmitting || Object.keys(errors).length > 0}
                            >
                                Reset Password
                            </button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </Container>
    );
};

export default ResetPassword;

