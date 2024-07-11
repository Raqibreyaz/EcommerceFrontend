import React, { useState, memo } from 'react';
import { Container } from '../../components/index.js';

const initialReviews = [
    {
        name: "Emily Selman",
        rating: 5,
        review: "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.",
        oneWord: "Perfect",
        image: "https://via.placeholder.com/50", // Replace with actual image URL
    },
    // Add more reviews as needed
];

const ReviewComponent = memo(({ productReviews }) => {


    return (
        <Container
            RenderingConditions={[!!productReviews, !!productReviews?.length > 0]}
            className="max-w-2xl mx-auto p-4"
        >
            {/* <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
                {/* {
                    edit ? <ReviewForm onSubmit={onEdit} defaultValues={edit} /> : <ReviewForm onSubmit={onSubmit} />
                } */}
            {/* </div>  */}
            <h2 className="text-2xl font-semibold text-center mb-4">Customer Reviews</h2>
            <div className="text-center mb-6">
                <div className="flex justify-center items-center text-yellow-500">
                    <span className="text-xl">★★★★★</span>
                    <span className="ml-2 text-gray-600">Based on {productReviews.length} reviews</span>
                </div>
                <div className="mt-4 space-y-2">
                    {/* Rating Breakdown */}
                    <div className="flex items-center">
                        <span>5</span>
                        <div className="w-full h-2 bg-gray-200 mx-2 rounded-full">
                            <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(productReviews.filter(r => r.rating === 5).length / productReviews.length) * 100}%` }}></div>
                        </div>
                        <span>{((productReviews.filter(r => r.rating === 5).length / productReviews.length) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center">
                        <span>4</span>
                        <div className="w-full h-2 bg-gray-200 mx-2 rounded-full">
                            <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(productReviews.filter(r => r.rating === 4).length / productReviews.length) * 100}%` }}></div>
                        </div>
                        <span>{((productReviews.filter(r => r.rating === 4).length / productReviews.length) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center">
                        <span>3</span>
                        <div className="w-full h-2 bg-gray-200 mx-2 rounded-full">
                            <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(productReviews.filter(r => r.rating === 3).length / productReviews.length) * 100}%` }}></div>
                        </div>
                        <span>{((productReviews.filter(r => r.rating === 3).length / productReviews.length) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center">
                        <span>2</span>
                        <div className="w-full h-2 bg-gray-200 mx-2 rounded-full">
                            <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(productReviews.filter(r => r.rating === 2).length / productReviews.length) * 100}%` }}></div>
                        </div>
                        <span>{((productReviews.filter(r => r.rating === 2).length / productReviews.length) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center">
                        <span>1</span>
                        <div className="w-full h-2 bg-gray-200 mx-2 rounded-full">
                            <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(productReviews.filter(r => r.rating === 1).length / productReviews.length) * 100}%` }}></div>
                        </div>
                        <span>{((productReviews.filter(r => r.rating === 1).length / productReviews.length) * 100).toFixed(0)}%</span>
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                {productReviews.map((review, index) => (
                    <div key={index} className="p-4 bg-white rounded-lg shadow">
                        <div className="flex items-center mb-2">
                            <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full mr-4" />
                            <div>
                                <h4 className="text-lg font-semibold">{review.name}</h4>
                                <div className="text-yellow-500">{"★".repeat(review.rating)}</div>
                            </div>
                        </div>
                        <p className="text-gray-700">{review.review}</p>
                        <p className="text-gray-500 italic">"{review.oneWord}"</p>
                        {/* {user._id === review.userId &&
                            < button
                                type='button'
                                className='p-3'
                                onClick={() => setEdit({ oneWord: review.oneWord, review: review.review, rating: review.rating })}
                            >Edit</button>} */}
                    </div>
                ))}
            </div>
        </Container>
    );
});

export default ReviewComponent;
