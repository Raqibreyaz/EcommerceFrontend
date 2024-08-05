import { useFetchSellersQuery } from '../dashboardSlice';
import React, { memo } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';
import { Container } from '../../../components/index.js'

const sellers = [
  {
    fullname: 'John Doe',
    avatar: 'https://via.placeholder.com/150',
    address: {
      house_no: '123',
      state: 'California',
      city: 'Los Angeles',
      pincode: '90001'
    },
    phoneNo: '123-456-7890',
    email: 'john.doe@example.com',
    joinedAt: '2021-01-01'
  },
  {
    fullname: 'Jane Smith',
    avatar: 'https://via.placeholder.com/150',
    address: {
      house_no: '456',
      state: 'New York',
      city: 'New York',
      pincode: '10001'
    },
    phoneNo: '987-654-3210',
    email: 'jane.smith@example.com',
    joinedAt: '2020-05-15'
  }
  // Add more sellers as needed
];

const SellerCard = memo(({ seller }) => (
  <div className="bg-white shadow-lg rounded-lg p-8 m-2 w-full transform transition-transform hover:shadow-xl">
    <div className="flex items-center mb-6 flex-wrap">
      <img src={seller.avatar.url} alt={seller.fullname} className=" w-20 h-20 rounded-full mr-6 border-2 border-gray-300 transition-transform hover:scale-110" />
      <div>
        <h2 className="text-2xl font-semibold capitalize">{seller.fullname}</h2>
        <p className="text-gray-500 flex items-center"><EnvelopeIcon className="h-5 w-5 mr-2" />{seller.email}</p>
      </div>
    </div>
    <div className="text-gray-700">
      {
        [
          {
            name: 'address',
            icon: <MapPinIcon />,
            child: `${seller.address.house_no}, ${seller.address.city}, ${seller.address.state} - ${seller.address.pincode}`
          },
          {
            name: 'joined at',
            icon: <CalendarDaysIcon />,
            child: seller.joinedAt ?
              new Date(seller.joinedAt).toLocaleDateString() : 'unknown'
          },
          {
            name: 'phone no',
            icon: <PhoneIcon />,
            child: seller.phoneNo
          },
        ].map(({ name, icon, child }) => (
          <p key={name} className="mb-4 flex items-center flex-wrap">
            <div className='flex'>
              <div className="h-5 w-5 mr-1">{icon}</div>
              <strong className='mr-2 '>{name}:</strong>
            </div>
            {child}
          </p>
        ))
      }
    </div>
  </div>
))

const SellerList = () => {

  const { data: { sellers = [] } = {}, isLoading: isLoadingSellers } = useFetchSellersQuery()

  return (
    <Container
      className="container mx-auto p-4"
      LoadingConditions={[!!isLoadingSellers]}
      backupElem={<h1 className='text-xl font-semibold text-center'>No sellers found</h1>}
    >
      <h1 className="text-4xl font-bold mb-4">List of Sellers</h1>
      <div className="flex flex-wrap  justify-center">
        {sellers.map((seller, index) => (
          <SellerCard key={seller._id} seller={seller} />
        ))}
      </div>
    </Container>
  )
}

export default SellerList;
