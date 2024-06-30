import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const initialReviews = [
  {
    name: "Emily Selman",
    rating: 5,
    feedback: "This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.",
    oneWord: "Perfect",
    image: "https://via.placeholder.com/50", // Replace with actual image URL
  },
  // Add more reviews as needed
];

const ReviewComponent = ({productReviews}) => {
  const { register, handleSubmit, reset } = useForm();
  const [reviews, setReviews] = useState(initialReviews);

  const onSubmit = (data) => {
    setReviews([...reviews, { ...data, image: 'https://via.placeholder.com/50' }]);
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">Customer Reviews</h2>
      <div className="text-center mb-6">
        <div className="flex justify-center items-center text-yellow-500">
          <span className="text-xl">★★★★★</span>
          <span className="ml-2 text-gray-600">Based on {reviews.length} reviews</span>
        </div>
        <div className="mt-4 space-y-2">
          {/* Rating Breakdown */}
          <div className="flex items-center">
            <span>5</span>
            <div className="w-full h-2 bg-gray-200 mx-2 rounded-full">
              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(reviews.filter(r => r.rating === 5).length / reviews.length) * 100}%` }}></div>
            </div>
            <span>{((reviews.filter(r => r.rating === 5).length / reviews.length) * 100).toFixed(0)}%</span>
          </div>
          <div className="flex items-center">
            <span>4</span>
            <div className="w-full h-2 bg-gray-200 mx-2 rounded-full">
              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(reviews.filter(r => r.rating === 4).length / reviews.length) * 100}%` }}></div>
            </div>
            <span>{((reviews.filter(r => r.rating === 4).length / reviews.length) * 100).toFixed(0)}%</span>
          </div>
          <div className="flex items-center">
            <span>3</span>
            <div className="w-full h-2 bg-gray-200 mx-2 rounded-full">
              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(reviews.filter(r => r.rating === 3).length / reviews.length) * 100}%` }}></div>
            </div>
            <span>{((reviews.filter(r => r.rating === 3).length / reviews.length) * 100).toFixed(0)}%</span>
          </div>
          <div className="flex items-center">
            <span>2</span>
            <div className="w-full h-2 bg-gray-200 mx-2 rounded-full">
              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(reviews.filter(r => r.rating === 2).length / reviews.length) * 100}%` }}></div>
            </div>
            <span>{((reviews.filter(r => r.rating === 2).length / reviews.length) * 100).toFixed(0)}%</span>
          </div>
          <div className="flex items-center">
            <span>1</span>
            <div className="w-full h-2 bg-gray-200 mx-2 rounded-full">
              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(reviews.filter(r => r.rating === 1).length / reviews.length) * 100}%` }}></div>
            </div>
            <span>{((reviews.filter(r => r.rating === 1).length / reviews.length) * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center mb-2">
              <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full mr-4" />
              <div>
                <h4 className="text-lg font-semibold">{review.name}</h4>
                <div className="text-yellow-500">{"★".repeat(review.rating)}</div>
              </div>
            </div>
            <p className="text-gray-700">{review.feedback}</p>
            <p className="text-gray-500 italic">"{review.oneWord}"</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Name</label>
            <input
              name="name"
              type="text"
              {...register('name')}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Rating</label>
            <select
              name="rating"
              {...register('rating')}
              className="p-2 border border-gray-300 rounded"
              required
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Good</option>
              <option value="3">3 - Average</option>
              <option value="2">2 - Poor</option>
              <option value="1">1 - Terrible</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">One Word for the Product</label>
            <input
              name="oneWord"
              type="text"
              {...register('oneWord')}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Review</label>
            <textarea
              name="feedback"
              {...register('feedback')}
              className="p-2 border border-gray-300 rounded"
              rows="4"
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewComponent;
