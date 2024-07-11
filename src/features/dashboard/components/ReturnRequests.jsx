import React from 'react';
import { Link } from 'react-router-dom';

const ReturnRequests = () => {
    const returnRequests = [
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
        {
          orderId: '60d21b4667d0d8992e610c86',
          productName: 'Keyboard',
          userName: 'Jane Smith',
          images: [
            'https://cdn.pixabay.com/photo/2015/09/05/21/51/keyboard-924920_960_720.jpg',
            'https://cdn.pixabay.com/photo/2016/03/27/07/08/keyboard-1283624_960_720.jpg',
            'https://cdn.pixabay.com/photo/2017/01/06/19/15/keyboard-1950423_960_720.jpg',
          ],
          reason: 'Some keys are not functioning properly.',
          toExchange: false,
          pickupAddress: {
            state: 'New York',
            city: 'New York',
            pincode: 10001,
            house_no: '5678',
          },
          status: 'approved',
          createdAt: '2023-07-02T14:20:00Z',
        },
        {
          orderId: '60d21b4667d0d8992e610c87',
          productName: 'Monitor',
          userName: 'Alice Johnson',
          images: [
            'https://cdn.pixabay.com/photo/2016/11/29/04/17/monitor-1866473_960_720.jpg',
            'https://cdn.pixabay.com/photo/2017/01/06/19/15/monitor-1950424_960_720.jpg',
            'https://cdn.pixabay.com/photo/2016/11/29/04/17/monitor-1866475_960_720.jpg',
            'https://cdn.pixabay.com/photo/2016/11/29/04/17/monitor-1866476_960_720.jpg',
          ],
          reason: 'The screen has dead pixels.',
          toExchange: true,
          pickupAddress: {
            state: 'Texas',
            city: 'Houston',
            pincode: 77001,
            house_no: '9101',
          },
          status: 'rejected',
          createdAt: '2023-07-03T09:15:30Z',
        },
        {
          orderId: '60d21b4667d0d8992e610c88',
          productName: 'Laptop',
          userName: 'Bob Brown',
          images: [
            'https://cdn.pixabay.com/photo/2016/11/29/04/17/laptop-1866477_960_720.jpg',
            'https://cdn.pixabay.com/photo/2017/01/06/19/15/laptop-1950425_960_720.jpg',
            'https://cdn.pixabay.com/photo/2016/11/29/04/17/laptop-1866478_960_720.jpg',
            'https://cdn.pixabay.com/photo/2016/11/29/04/17/laptop-1866479_960_720.jpg',
            'https://cdn.pixabay.com/photo/2016/11/29/04/17/laptop-1866480_960_720.jpg',
          ],
          reason: 'The battery is not charging.',
          toExchange: false,
          pickupAddress: {
            state: 'Florida',
            city: 'Miami',
            pincode: 33101,
            house_no: '1122',
          },
          status: 'pending',
          createdAt: '2023-07-04T11:45:00Z',
        },
        // Add more return requests as needed
      ];
      
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Return Requests</h1>
      <div className="space-y-6">
        {returnRequests.map((request, index) => (
          <Link
          to='/return-details'
            key={index}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 block"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{request.productName}</h2>
              <p className="text-gray-500">Requested by: {request.userName}</p>
              <p className="text-gray-500">Status: {request.status}</p>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Images</h3>
              <div className="flex flex-wrap space-x-2">
                {request.images.map((image, idx) => (
                  <img key={idx} src={image} alt={`Return image ${idx + 1}`} className="w-24 h-24 object-cover rounded mb-2" />
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReturnRequests;
