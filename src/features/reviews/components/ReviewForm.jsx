import React from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { FormError } from '../../../components/index.js'

function ReviewForm({ onSubmit, defaultValues = { oneWord: '', rating: 5, review: '' } }) {

    console.log(defaultValues);

    const methods = useForm({ defaultValues });

    const { handleSubmit, register } = methods

    return (
        <FormProvider {...methods}>
            <form className="space-y-4">
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-600">Rating</label>
                    <select
                        {...register('rating', { required: "rating is required!!" })}
                        defaultValue={defaultValues.rating}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Good</option>
                        <option value="3">3 - Average</option>
                        <option value="2">2 - Below Average</option>
                        <option value="1">1 - Bad</option>
                    </select>
                    <FormError field={'rating'} />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-600">One Word for the Product</label>
                    <input
                        type="text"
                        {...register('oneWord', { required: "one word is required", maxLength: 10, })}
                        defaultValue={defaultValues.oneWord}
                        className="p-2 border border-gray-300 rounded"
                    />
                    <FormError field={'oneWord'} />
                </div>
                <div className="flex flex-col">
                    <label className="mb-1 text-gray-600">Review</label>
                    <textarea
                        {...register('review', { required: "review is required!!", minLength: 10 })}
                        defaultValue={defaultValues.review}
                        className="p-2 border border-gray-300 rounded"
                        rows="4"
                    />
                    <FormError field={'review'} />
                </div>
                <div className="text-center">
                    <button type="button"
                        onClick={handleSubmit(onSubmit)}
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit Review</button>
                </div>
            </form>
        </FormProvider>
    )
}

export default ReviewForm
