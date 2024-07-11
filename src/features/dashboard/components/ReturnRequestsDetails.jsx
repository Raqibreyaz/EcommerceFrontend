import React from 'react';

const ReturnRequests = () => {

  const returnRequestDetails = [
    {
      orderId: '60d21b4667d0d8992e610c85',
      productName: 'Wireless Mouse',
      userName: 'John Doe',
      images: [
        'https://cdn.pixabay.com/photo/2016/11/29/04/17/mouse-1866472_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/01/06/19/15/mouse-1950422_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/04/17/mouse-1866471_960_720.jpg',
        'https://cdn.pixabay.com/photo/2016/11/29/04/17/mouse-1866470_960_720.jpg',
      ],
      reason: 'The mouse is not working properly and the scroll wheel is stuck.',
      toExchange: true,
      pickupAddress: {
        state: 'California',
        city: 'Los Angeles',
        pincode: 90001,
        house_no: '1234',
      },
      status: 'pending',
      createdAt: '2023-07-01T12:34:56Z',
    },
    // Add more return requests as needed
  ];
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Return Requests</h1>
      <div className="space-y-6">
        {returnRequestDetails.map((request, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{request.productName}</h2>
              <p className="text-gray-500">Requested by: {request.userName}</p>
              <p className="text-gray-500">Order ID: {request.orderId}</p>
              <p className="text-gray-500">Status: {request.status}</p>
              <p className="text-gray-500">Requested on: {new Date(request.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Reason for Return</h3>
              <p className="text-gray-700">{request.reason}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Images</h3>
              <div className="flex flex-wrap space-x-2">
                {request.images.map((image, idx) => (
                  <img key={idx} src={image} alt={`Return image ${idx + 1}`} className="w-24 h-24 object-cover rounded mb-2" />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Pickup Address</h3>
              <p className="text-gray-700">{request.pickupAddress.house_no}, {request.pickupAddress.city}, {request.pickupAddress.state}, {request.pickupAddress.pincode}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Exchange Requested</h3>
              <p className="text-gray-700">{request.toExchange ? 'Yes' : 'No'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReturnRequests;
