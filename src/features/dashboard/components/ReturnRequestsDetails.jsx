import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetchReturnRequestDetailsQuery, useUpdateReturnRequestMutation } from '../../orders/orderSlice.js';
import { Container, PopImage } from '../../../components/index.js';
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage.js';

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

  const [UpdateReturnRequest, { isLoading: isUpdatingReturnRequest }] = useUpdateReturnRequestMutation()

  const fields = useMemo(() => (
    returnDetails ?
      {
        'product name': returnDetails?.productDetails.product_name,
        'requested by': returnDetails?.customerDetails.fullname,
        'return quanity': returnDetails?.quantity,
        'customer contact': returnDetails?.customerDetails.phoneNo,
        'customer email': returnDetails?.customerDetails.email,
        'refund amount': returnDetails?.refundAmount,
        'order id': returnDetails?.orderId,
        'requested on': returnDetails ? new Date(returnDetails.createdAt).toLocaleString() : '',
        'is returnable': returnDetails?.productDetails.isReturnable ? 'Yes' : 'No',
        'return policy': returnDetails?.productDetails.returnPolicy
      } : {}
  ), [returnDetails])

  return (
    <Container
      className="container mx-auto p-4"
      RenderingConditions={[!!returnDetails]}
      LoadingConditions={[!!isFetchingReturnRequestDetails, !!isUpdatingReturnRequest]}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Return Requests</h1>
      {returnDetails && <div className="space-y-6">
        <div
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
        >
          <div className="mb-4 text-sm">
            {
              Object.keys(fields).map((field, index) => (
                <div key={field}>
                  <span className='capitalize font-semibold '>{field}: </span>
                  <p className='inline-block'>
                    {fields[field]}
                  </p>
                </div>
              ))
            }
            <div>
              <label htmlFor='return status' className='font-semibold text-sm'>
                Status:
              </label>
              <select
                className={
                  { "pending": 'text-yellow-500', 'approved': 'text-green-500', 'rejected': 'text-red-500' }[returnDetails.status]
                }
                defaultValue={returnDetails.status}
                id="return status"
                onChange={(e) => catchAndShowMessage(UpdateReturnRequest, {
                  data: {
                    status: e.target.value, orderId: returnDetails.orderId
                  },
                  id: returnId
                })}
              >
                <option value="pending" className='text-yellow-500'>pending</option>
                <option value="approved" className='text-green-500'>approved</option>
                <option value="rejected" className='text-red-500'>rejected</option>
              </select>
            </div>
          </div>
          <div className='mb-2 text-blue-500 capitalize underline text-sm'>
            <Link to={`/order-details/${returnDetails.orderId}`}>
              view order details
            </Link>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Reason for Return</h3>
            <p className="text-gray-700">{returnDetails.reason}</p>
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
      </div>
      }
    </Container >
  );
};

export default ReturnRequests;
