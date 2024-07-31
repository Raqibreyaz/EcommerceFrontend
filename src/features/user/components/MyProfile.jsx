import React, { useState, memo, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Pagination, ProductGrid } from '../../../components/index.js'
import { useChangeUserAvatarMutation, useFetchUserQuery } from '../userSlice.js';
import { useFetchProductsQuery } from '../../product-list/ProductSlice.js';

const ProfileDetails = memo(
    ({ user, address }) => {
        const Navigate = useNavigate()
        return (
            <Container
                className='relative'
                RenderingConditions={[!!user, !!address]}
            >
                <button onClick={() => Navigate('/edit-profile')} className='right-0 mx-2 mt-1 inline-block bg-indigo-600 text-white p-1 rounded-md'>
                    Edit Profile
                </button>
                <div className="p-6 space-y-4">
                    <div className="flex items-center">
                        <span className="w-24 font-bold">Email:</span>
                        <span>{user.email}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-24 font-bold">Phone:</span>
                        <span>{user.phoneNo}</span>
                    </div>
                    <div className="">
                        <span className="w-24 font-bold">Address:</span>
                        <Link to='/edit-profile/address' className='mx-2 bg-blue-600 text-white px-2 rounded-md'>Edit</Link>
                        <div className='mt-3 flex flex-col '>
                            <div className='capitalize flex flex-col gap-2'>
                                {['house_no', 'city', "state", 'pincode'].map((field) => (
                                    <div className='border rounded p-1 flex' key={field}>{field}: {address[field]}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
)

const ProfileHeader = memo(({ user }) => {

    const [newAvatar, setNewAvatar] = useState({ path: '', file: null })

    const [ChangeAvatar, { isLoading: isLoadingChangeAvatar }] = useChangeUserAvatarMutation()

    // calls the changeAvatar api function with the newAvatar
    const onSubmit = useCallback(
        () => {
            const formData = new FormData()
            formData.append('newAvatar', newAvatar.file)
            ChangeAvatar(formData)
        },
        [newAvatar],
    )

    // revoke the url of the preview image
    useEffect(() => {
        return () => { if (newAvatar.path) URL.revokeObjectURL(newAvatar.path) }
    }, [])


    return (
        <Container
            className="flex flex-col md:flex-row items-center p-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white"
            LoadingConditions={[isLoadingChangeAvatar]}
            RenderingConditions={[!!user]}
        >
            <div className='w-32 h-32 relative'>
                <img
                    src={newAvatar.path || user.avatar.url}
                    alt={user.fullname}
                    className="size-full rounded-full border-4 border-white mb-4 md:mb-0"
                />
                <div className='absolute top-1/2 size-full'>
                    {newAvatar.path ?
                        <button type='button' className='p-1 rounded-md bg-red-300 text-[12px] right-0 absolute top-[30%]'
                            onClick={() => onSubmit()}>
                            Confirm Avatar
                        </button> :
                        <label htmlFor="avatar" className='right-0 absolute bottom-1/2 bg-yellow-600 px-1 rounded-md '>
                            edit
                        </label>}
                    <input type="file" id='avatar' className='opacity-0' onChange={(e) => setNewAvatar({
                        path: URL.createObjectURL(e.target.files[0]),
                        file: e.target.files[0]
                    })} />
                </div>
            </div>
            <div className="md:ml-6 text-center md:text-left">
                <h2 className="text-3xl font-bold">{user.fullname}</h2>
                <p className="text-lg">{user.role}</p>
            </div>
        </Container>

    )
})


const UserProfile = () => {

    const { data: { user = null } = {}, isLoading: isLoadingUser } = useFetchUserQuery()

    const [page, setPage] = useState(1)

    const { data: { products = [], totalPages = 1, filteredTotal = 0 } = {}, isLoading: isLoadingProducts } = useFetchProductsQuery(`product_owners=${user?._id || ''}&&page=${page}`)

    return (
        < Container
            LoadingConditions={[
                isLoadingUser, isLoadingProducts
            ]}
            RenderingConditions={[!!user, products.length > 0]}
        >
            < div className="min-h-screen bg-gray-100  p-4" >
                <div className="max-w-4xl  bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Header */}
                    <ProfileHeader user={user} />
                    {/* Profile Details */}
                    <ProfileDetails user={user} address={user?.addresses[0]} />
                    {/* Product Cards */}
                    <div className="p-6 bg-gray-100">
                        <h3 className="text-2xl font-bold mb-4">Products</h3>
                        <ProductGrid products={products} />
                    </div>
                </div>
                <Pagination totalPages={totalPages} filteredTotal={filteredTotal} page={page} PageChanger={setPage} />
            </div >
        </Container >
    );
};

export default UserProfile;
