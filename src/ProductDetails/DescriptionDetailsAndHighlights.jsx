import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const DescriptionDetailsAndHighlights = React.memo(function ({ product }) {

    const Navigate = useNavigate()

    return (
        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description,keyHighlights and details */}
            <div>
                <button type='button' onClick={() => { Navigate(`/profile/${product.owner._id}`) }}
                    className='text-blue-600 font-semibold'
                >
                    see owner profile
                </button>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                    <p className="text-base text-gray-900">{product.description}</p>
                </div>
            </div>
            <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                <div className="mt-4">
                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                        {product.keyHighlights?.map((highlight) => (
                            <li key={highlight} className="text-gray-400">
                                <span className="text-gray-600">{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details}</p>
                </div>
            </div>
        </div>
    )
})

export default DescriptionDetailsAndHighlights
