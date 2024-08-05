import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetchReturnRequestsQuery } from '../../orders/orderSlice';
import { Container, Pagination } from '../../../components/index.js'

const RequestCard = memo(({ request = {} }) => {

  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 block"
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold">{request.product_name}</h2>
        <p className="text-gray-500">Requested by: {request.customer_name}</p>
        <p className="text-gray-500">Refund amount: {request.refundAmount}</p>
        <p className="text-gray-500">product quantity: {request.quantity}</p>
        <p className="text-gray-500">Requested At: {new Date(request.createdAt).toLocaleString()}</p>
        <p className="text-gray-500">Status: {request.status}</p>
      </div>
      <div className="mb-1">
        <h3 className="text-lg font-semibold">Images</h3>
        <div className="flex flex-wrap space-x-2">
          {request.images.map((image, idx) => (
            <img
              key={image._id}
              src={image.url}
              alt={`Return image ${image._id}`}
              className="w-24 h-24 object-cover rounded mb-2"
            />
          ))}
        </div>
      </div>
      <Link to={`/return-details/${request._id}`} className='text-blue-500 text-sm'>view details</Link>
    </div>
  )
}
)

const ReturnRequests = () => {

  const [page, setPage] = useState(1)

  const { data: { returnRequests = [], filteredTotal = 0, totalPages = 1 } = {}, isLoading: isFetchingReturnRequests } = useFetchReturnRequestsQuery(`page=${page}&&limit=10`)
  
  return (
    <Container
      className="container mx-auto p-4"
      LoadingConditions={[!!isFetchingReturnRequests]}
      RenderingConditions={[!!returnRequests, returnRequests.length > 0]}
      backupElem={<h1 className='text-center text-xl'>No Return Requests found</h1>}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Return Requests</h1>
      <div className="space-y-6">
        {returnRequests.map((request) => (
          <RequestCard request={request} key={request._id} />
        ))}
      </div>
      <Pagination totalPages={totalPages} filteredTotal={filteredTotal} page={page} PageChanger={setPage} />
    </Container>
  );
};

export default ReturnRequests;
