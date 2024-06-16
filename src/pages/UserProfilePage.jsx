import React from 'react';
import { useSelector } from 'react-redux';
import 'tailwindcss/tailwind.css';
import { useFieldArray, useForm } from 'react-hook-form';

const UserProfileCompo = ({ user }) => {

  const { handleSubmit, register, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      fullname: user.name,
      phoneNo: user.phoneNo,
      email: user.email,
      addresses: user.addresses
    }
  })

  useFieldArray({
    control,
    name: 'addresses'
  })

  return (
    <div className="max-w-4xl  bg-white shadow-md rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center p-6 bg-gradient-to-r from-blue-500 to-teal-500 text-white">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-32 h-32 rounded-full border-4 border-white mb-4 md:mb-0"
        />
        <div className="md:ml-6 text-center md:text-left">
          <h2 className="text-3xl font-bold">{user.name}</h2>
          <p className="text-lg">{user.title}</p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-6 space-y-4">
        <div className="flex items-center">
          <span className="w-24 font-bold">Email:</span>
          <span>{user.email}</span>
        </div>
        <div className="flex items-center">
          <span className="w-24 font-bold">Phone:</span>
          <span>{user.phone}</span>
        </div>
        <div className="flex flex-col ">
          <span className="w-24 font-bold">Address:</span>
          {
            user.addresses.map(({ house_no, city, state, pincode }, index) => (
              <div className='mt-3'>
                <h1 className='font-semibold'>Address {index + 1}</h1>
                <div className='capitalize flex flex-col'>
                  <span>house no: {house_no}</span>
                  <span>city: {city}</span>
                  <span>state: {state}</span>
                  <span>pincode: <input type="text" value={ } />{pincode}</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* Product Cards */}
      {/* <div className="p-6 bg-gray-100">
        <h3 className="text-2xl font-bold mb-4">Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.products.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-lg font-bold mb-2">{product.name}</h4>
              <p className="text-gray-700">{product.description}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

const UserProfile = () => {

  const userData = useSelector(state => state.user.userData)

  const user = {
    name: userData.fullname,
    title: userData.role,
    avatar: userData.avatar.url,
    email: userData.email,
    phone: userData.phoneNo,
    addresses: userData.addresses
  }
  //   products: [
  //     {
  //       id: 1,
  //       name: 'Product 1',
  //       description: 'This is a description for product 1.',
  //       image: 'https://via.placeholder.com/300x200',
  //     },
  //     {
  //       id: 2,
  //       name: 'Product 2',
  //       description: 'This is a description for product 2.',
  //       image: 'https://via.placeholder.com/300x200',
  //     },
  //     {
  //       id: 3,
  //       name: 'Product 3',
  //       description: 'This is a description for product 3.',
  //       image: 'https://via.placeholder.com/300x200',
  //     },
  //   ],
  // };

  return (
    <div className="min-h-screen bg-gray-100  p-4">
      <UserProfileCompo user={user} />
    </div>
  );
};

export default UserProfile;
