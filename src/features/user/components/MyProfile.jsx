import React, { useState, memo, useCallback, useEffect } from 'react';
import { useUser } from '../../../custom-hooks/useUser.js'
import { useFilter } from '../../../custom-hooks/useFilter.js'
import { Link, useNavigate } from 'react-router-dom';
import { ProductGrid } from '../../../components/index.js'
import { useFetchUserQuery } from '../userSlice.js';

const UserProfileCompo = memo(({ user, address, products, HandleChangeUserAvatar }) => {

    console.log(user);
    console.log(products);

    const [newAvatar, setNewAvatar] = useState({ path: '', file: null })

    const Navigate = useNavigate()

    const onSubmit = useCallback(
        () => {
            const formData = new FormData()
            formData.append('newAvatar', newAvatar.file)
            HandleChangeUserAvatar(formData)
        },
        [newAvatar],
    )

    useEffect(() => {
        return () => { if (newAvatar.path) URL.revokeObjectURL(newAvatar.path) }
    }, [])

    return (
        <div className="max-w-4xl  bg-white shadow-md rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center p-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
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
            </div>

            {/* Profile Details */}
            <div className='relative'>
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
                                <div className='border rounded p-1 flex'>house no: {address.house_no}</div>
                                <div className='border rounded p-1 flex'>city: {address.city}</div>
                                <div className='border rounded p-1 flex'>state: {address.state}</div>
                                <div className='border rounded p-1 flex'>pincode: {address.pincode}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Product Cards */}
            <div className="p-6 bg-gray-100">
                <h3 className="text-2xl font-bold mb-4">Products</h3>
                <ProductGrid products={products} />
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 shadow rounded-lg">
                            <img
                                src={product.thumbnail.url}
                                alt={product.product_name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h4 className="text-lg font-bold mb-2">{product.product_name}</h4>
                            <p className="text-gray-700">{product.description}</p>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
})

const UserProfile = () => {

    const { HandleChangeUserAvatar } = useUser()
    const { products, HandleFilterSelection } = useFilter()

    const { data: { user }} = useFetchUserQuery()

    // fetch all products of that user
    useEffect(() => {
        HandleFilterSelection(true, 'product_owners', [user._id])
    }
        , [])

    return (
        <div className="min-h-screen bg-gray-100  p-4">
            {
                <UserProfileCompo user={user} address={user?.addresses[0]} products={products} HandleChangeUserAvatar={HandleChangeUserAvatar} />
            }
        </div>
    );
};

export default UserProfile;
