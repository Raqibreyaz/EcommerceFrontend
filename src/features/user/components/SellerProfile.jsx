import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../../custom-hooks/useUser'
import { useFilter } from '../../../custom-hooks/useFilter'
import Loader from '../../../components/Loader'
import { ProductGrid } from '../../../components/index.js'

function SellerProfile() {

    const userId = useParams().id

    const { userProfileDetails, HandleFetchProfileDetails, userStatus } = useUser()

    const { products, HandleFilterSelection, productStatus } = useFilter()

    console.log(userStatus, productStatus);

    useEffect(() => {
        HandleFetchProfileDetails(userId)
        HandleFilterSelection(true, 'product_owners', [userId])
    }, [])


    return (
        (userStatus === 'loading' || productStatus === 'loading')
            ? <Loader /> :
            (userProfileDetails && < div className="max-w-4xl  bg-white shadow-md rounded-lg overflow-hidden" >
                {/* Header */}
                < div className="flex flex-col md:flex-row items-center p-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white" >
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
                </div >
                {/* Product Cards */}
                < div className="p-6 bg-gray-100" >
                    <h3 className="text-2xl font-bold mb-4">Products</h3>
                    <ProductGrid products={products} />
                </div >
            </div >)
    )
}

export default SellerProfile
