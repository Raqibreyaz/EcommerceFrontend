import React from 'react';
import 'tailwindcss/tailwind.css';

const UserProfileCompo = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
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
        <div className="flex items-center">
          <span className="w-24 font-bold">Address:</span>
          <span>{user.address}</span>
        </div>
      </div>

      {/* Product Cards */}
      <div className="p-6 bg-gray-100">
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
      </div>
    </div>
  );
};

const UserProfile = () => {
  const user = {
    name: 'James Cartel',
    title: 'Design Student',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    email: 'james.cartel@example.com',
    phone: '123-456-7890',
    address: '1234 Design Street, Creative City, Designland',
    products: [
      {
        id: 1,
        name: 'Product 1',
        description: 'This is a description for product 1.',
        image: 'https://via.placeholder.com/300x200',
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'This is a description for product 2.',
        image: 'https://via.placeholder.com/300x200',
      },
      {
        id: 3,
        name: 'Product 3',
        description: 'This is a description for product 3.',
        image: 'https://via.placeholder.com/300x200',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <UserProfileCompo user={user} />
    </div>
  );
};

export default UserProfile;
