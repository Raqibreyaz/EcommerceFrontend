import React, { useCallback, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form';
import { Container, FormError } from '../../../components/index.js'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useCreateProductReviewMutation, useFetchUserReviewQuery } from '../reviewSlice.js';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage.js';

function ReviewForm() {

    const methods = useForm();

    const { id } = useParams()

    const Navigate = useNavigate()

    const { from } = useLocation().state ?? {}

    const { data: { userReview = {} } = {}, isLoading: isLoadingUserReview } = useFetchUserReviewQuery(id)

    const [CreateProductReview, { isLoading: isCreatingProductReview, isSuccess: isSuccessfullyCreatedProductReview }] = useCreateProductReviewMutation()

    const { handleSubmit, register } = methods

    useEffect(() => {

        if (isSuccessfullyCreatedProductReview) {
            Navigate(from || '/')
        }

    }, [isSuccessfullyCreatedProductReview])

    return (
        <Container
            LoadingConditions={[!!isLoadingUserReview, !!isCreatingProductReview]}
        >
            <FormProvider {...methods}>
                <form className="space-y-4" onSubmit={handleSubmit((data) => catchAndShowMessage(CreateProductReview, { data, id }))}>
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600">Rating</label>
                        <select
                            {...register('rating', { required: "rating is required!!" })}
                            className="p-2 border border-gray-300 rounded"
                            defaultValue={userReview.rating ? `${userReview.rating}` : '5'}
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
                            className="p-2 border border-gray-300 rounded"
                            defaultValue={userReview.oneWord ? userReview.oneWord : ''}
                        />
                        <FormError field={'oneWord'} />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-600">Review</label>
                        <textarea
                            {...register('review',
                                {
                                    required: "review should have more than 10 characters",
                                    minLength: 10,
                                    validate: (review) => review.length >= 10 || "review should have more than 10 characters"
                                })}
                            className="p-2 border border-gray-300 rounded"
                            rows="4"
                            defaultValue={userReview.review ? userReview.review : ''}
                        />
                        <FormError field={'review'} />
                    </div>
                    <div className="text-center">
                        <button type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit Review</button>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}

export default ReviewForm
