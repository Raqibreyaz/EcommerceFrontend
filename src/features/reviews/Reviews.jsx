import React, { useState, memo, useMemo, useCallback } from 'react';
import { Container, Pagination } from '../../components/index.js';
import { useParams } from 'react-router-dom';
import { useFetchProductReviewsQuery } from './reviewSlice.js';

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

const RatingBreakdown = memo(({ reviewStats = [], filteredTotal = 0 }) => {

    return (
        <div className="mt-4 space-y-2">
            {
                Array.from({ length: 5 }, (_, rating) => {

                    const { count } = reviewStats?.find(({ _id }) => {
                        console.log(_id, rating + 1);
                        return _id === rating + 1
                    }) ?? { count: 0 }

                    console.log(count);

                    return (
                        < div key={rating} className='flex items-center'>
                            <span>{rating + 1}</span>
                            <div className="w-full h-2 bg-gray-200 mx-2 rounded-full">
                                <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${(count ?? 0 / filteredTotal) * 100}%` }}></div>
                            </div>
                            <span>{((count / filteredTotal) * 100).toFixed(0)}%</span>
                        </div>
                    )
                }).reverse()
            }
        </div>
    )
})

const ReviewCard = memo(({ review = {} }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center mb-2">
                <img src={review?.user?.avatar?.url || ''} alt={review?.user?.fullname} className="w-10 h-10 rounded-full mr-4" />
                <div>
                    <h4 className="text-lg font-semibold">{review?.user?.fullname}</h4>
                    <div className="text-yellow-500">{"★".repeat(review?.rating)}</div>
                </div>
                <div className='space-x-2 ml-auto'>
                    <span className="text-gray-700">{review?.user?.address.state}</span>,
                    <span className="text-gray-700">{review?.user?.address.city}</span>
                </div>
            </div>
            <div>
                <p className="text-gray-700">{review?.review}</p>
                <p className="text-gray-500 italic">"{review?.oneWord}"</p>
            </div>
        </div>
    )
}
)

const ReviewComponent = memo(() => {

    const [filter, setFilter] = useState({ page: 1, limit: 10 })

    const { id } = useParams()

    const query = useMemo(() => {
        let query = ''
        for (const key in filter) {
            if (Object.hasOwnProperty.call(filter, key)) {
                const value = filter[key];
                query += query ? `&&${key}=${value}` : `${key}=${value}`
            }
        }
        return query
    }, [filter])

    const HandleChangeFilter = useCallback(
        (page, rating) => {
            setFilter((prevFilter) => {
                const newFilter = { ...prevFilter }
                if (page)
                    newFilter.page = page
                if (rating)
                    newFilter.rating = rating
                return newFilter
            })
        }, [])

    const { data: { productReviews = [], filteredTotal = 0, reviewStats = [], totalPages = 1 } = {}, isLoading: isLoadingReviews } = useFetchProductReviewsQuery({ id, query })

    console.log(productReviews);

    return (
        <Container
            RenderingConditions={[!!productReviews, !!productReviews?.length > 0]}
            className="max-w-2xl mx-auto p-4"
            LoadingConditions={[!!isLoadingReviews]}
        >
            <h2 className="text-2xl font-semibold text-center mb-4">Customer Reviews</h2>
            <div className="text-center mb-6">
                <div className="flex justify-center items-center text-yellow-500">
                    <span className="text-xl">★★★★★</span>
                    <span className="ml-2 text-gray-600">Based on {filteredTotal} reviews</span>
                </div>
                <RatingBreakdown reviewStats={reviewStats} filteredTotal={filteredTotal} />
            </div>
            <div className="space-y-4">
                {productReviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </div>
            <Pagination page={filter.page} PageChanger={HandleChangeFilter} totalPages={totalPages} filteredTotal={filteredTotal} />
        </Container>
    );
})
export default ReviewComponent;
