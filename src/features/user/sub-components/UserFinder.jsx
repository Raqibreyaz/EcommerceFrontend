import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormError } from '../../../components/index.js'

const UserFinder = memo(({ btnText, onSubmit, isLoading }) => {

    const { handleSubmit, formState: { errors, isSubmitting } } = useFormContext()

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
                <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <FormError field={'email'} />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 capitalize"
                    disabled={isLoading || Object.keys(errors).length > 0 || !isSubmitting}
                >
                    {isLoading ? 'Loading...' : btnText}
                </button>
            </form>
        </div>
    );
})

export default UserFinder
