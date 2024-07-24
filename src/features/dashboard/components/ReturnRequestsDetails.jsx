import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchReturnRequestDetailsQuery } from '../../orders/orderSlice.js';
import { Container, PopImage } from '../../../components/index.js';

const ReturnRequests = () => {

  // const returnDetails = [
  //   {
  //     orderId: '60d21b4667d0d8992e610c85',
  //     productName: 'Wireless Mouse',
  //     userName: 'John Doe',
  //     images: [
  //       'https://cdn.pixabay.com/photo/2016/11/29/04/17/mouse-1866472_960_720.jpg',
  //       'https://cdn.pixabay.com/photo/2017/01/06/19/15/mouse-1950422_960_720.jpg',
  //       'https://cdn.pixabay.com/photo/2016/11/29/04/17/mouse-1866471_960_720.jpg',
  //       'https://cdn.pixabay.com/photo/2016/11/29/04/17/mouse-1866470_960_720.jpg',
  //     ],
  //     reason: 'The mouse is not working properly and the scroll wheel is stuck.',
  //     toExchange: true,
  //     pickupAddress: {
  //       state: 'California',
  //       city: 'Los Angeles',
  //       pincode: 90001,
  //       house_no: '1234',
  //     },
  //     status: 'pending',
  //     createdAt: '2023-07-01T12:34:56Z',
  //   },
  //   // Add more return requests as needed
  // ];

  const { id: returnId } = useParams()

  const { data: { returnDetails = null } = {}, isLoading: isFetchingReturnRequestDetails } = useFetchReturnRequestDetailsQuery(returnId)

  console.log(returnDetails);

  return (
    <Container
      className="container mx-auto p-4"
      RenderingConditions={[!!returnDetails]}
      LoadingConditions={[!!isFetchingReturnRequestDetails]}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Return Requests</h1>
      {returnDetails && <div className="space-y-6">
        <div
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="mb-4">
            <h2 className="text-xl ">Product Name: <span className='font-semibold'>{returnDetails?.productDetails.product_name}</span></h2>
            <p className="text-gray-500">Requested by: {returnDetails.customerDetails.fullname}</p>
            <p className="text-gray-500">Return Quantity: {returnDetails.quantity}</p>
            <p className="text-gray-500">Customer Contact: {returnDetails.customerDetails.phoneNo}</p>
            <p className="text-gray-500">Customer Email: {returnDetails.customerDetails.email}</p>
            <p className="text-gray-500">Refund amount: {returnDetails.refundAmount}</p>
            <p className="text-gray-500">Order ID: {returnDetails.orderId}</p>
            <p className="text-gray-500">Status: {returnDetails.status}</p>
            <p className="text-gray-500">Requested on: {new Date(returnDetails.createdAt).toLocaleString()}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Reason for Return</h3>
            <p className="text-gray-700">{returnDetails.reason}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">IsReturnable: {returnDetails.productDetails.isReturnable?'Yes':'No'}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">Return Policy: {returnDetails.productDetails.returnPolicy}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Images</h3>
            <div className="flex flex-wrap space-x-2">
              {returnDetails.images.map((image, idx) => (
                <img 
                key={image._id}
                 src={image.url} 
                 alt={`Return image ${image._id}`} 
                 className="w-24 h-24 object-cover rounded mb-2"
                 onClick={() => PopImage(image.url, false)}
                  />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Pickup Address</h3>
            <p className="text-gray-700">{returnDetails.pickupAddress.house_no}, {returnDetails.pickupAddress.city}, {returnDetails.pickupAddress.state}, {returnDetails.pickupAddress.pincode}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Replace Requested</h3>
            <p className="text-gray-700">{returnDetails.toReplace ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>}
    </Container>
  );
};

export default ReturnRequests;
