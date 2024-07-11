import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ProductGrid, Container } from '../../../components/index.js'
import { useFetchProfileDetailsQuery } from '../userSlice.js'
import { useFetchProductsQuery } from '../../product-list/ProductSlice.js'

function SellerProfile() {

    const userId = useParams().id

    const { data: { products = [] } = {}, isLoading: isLoadingProducts } = useFetchProductsQuery(`product_owners=${userId}`)

    const { data: { profileDetails = null } = {}, isLoading: isLoadingProfile } = useFetchProfileDetailsQuery(userId)

    console.log(products);

    return (
        <Container
            LoadingConditions={[!!isLoadingProducts, !!isLoadingProfile]}
            RenderingConditions={[!!profileDetails]}
            className="max-w-4xl  bg-white shadow-md rounded-lg overflow-hidden"
        >
            {/* Header */}
            < div className="flex flex-col md:flex-row items-center p-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white" >
                <div className='w-32 h-32 relative'>
                    <img
                        src={profileDetails?.avatar?.url || ''}
                        alt={profileDetails?.fullname || ''}
                        className="size-full rounded-full border-4 border-white mb-4 md:mb-0"
                    />
                </div>
                <div className="md:ml-6 text-center md:text-left">
                    <h2 className="text-3xl font-bold">{profileDetails?.fullname || ''}</h2>
                    <p className="text-lg">{profileDetails?.role || ''}</p>
                </div>
            </div >
            {/* Product Cards */}
            < div className="p-6 bg-gray-100" >
                <h3 className="text-2xl font-bold mb-4">Products</h3>
                <ProductGrid products={products} />
            </div >
        </Container>
    )
}

export default SellerProfile
