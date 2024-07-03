import React from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../../custom-hooks/useUser'
import { useFilter } from '../../../custom-hooks/useFilter'

function SellerProfile() {

    const userId = useParams().id

    const { userProfileDetails, HandleFetchProfileDetails } = useUser()

    const { products, HandleFilterSelection } = useFilter()

    useEffect(() => {
        HandleFetchProfileDetails(userId)
        HandleFilterSelection(true, 'product_owners', [userId])
    }, [])


    return (
        <div className="max-w-4xl  bg-white shadow-md rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center p-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                <div className='w-32 h-32 relative'>
                    <img
                        src={userProfileDetails.avatar.url}
                        alt={userProfileDetails.fullname}
                        className="size-full rounded-full border-4 border-white mb-4 md:mb-0"
                    />
                </div>
                <div className="md:ml-6 text-center md:text-left">
                    <h2 className="text-3xl font-bold">{userProfileDetails.fullname}</h2>
                    <p className="text-lg">{userProfileDetails.role}</p>
                </div>
            </div>
            {/* Product Cards */}
            <div className="p-6 bg-gray-100">
                <h3 className="text-2xl font-bold mb-4">Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 shadow rounded-lg">
                            <img
                                src={product.thumbnail}
                                alt={product.product_name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h4 className="text-lg font-bold mb-2">{product.product_name}</h4>
                            <p className="text-gray-700">{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SellerProfile
