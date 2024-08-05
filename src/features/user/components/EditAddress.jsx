import React, { useState, memo } from 'react';
import { useFetchUserQuery, useRemoveAddressMutation } from '../../user/userSlice.js'
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage.js'
import { Container } from '../../../components/index.js';

const AddressCard = memo(function ({ address, RemoveAddress, noOfAddress }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="mb-2">
        <span className="font-bold">House No:</span> {address.house_no}
      </div>
      <div className="mb-2">
        <span className="font-bold">City:</span> {address.city}
      </div>
      <div className="mb-2">
        <span className="font-bold">State:</span> {address.state}
      </div>
      <div className="mb-2">
        <span className="font-bold">Pincode:</span> {address.pincode}
      </div>
      <Container
        RenderingConditions={[noOfAddress > 1]}
      >
        <button
          onClick={() => catchAndShowMessage(RemoveAddress, address._id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Remove Address
        </button>
      </Container>
    </div>
  )
})

const AddressRemovalForm = () => {

  const { data: { user } = {}, isLoading: isLoadingUser } = useFetchUserQuery()
  const [RemoveAddress, { isLoading: isLoadingRemoveAddress }] = useRemoveAddressMutation()

  return (
    < Container
      LoadingConditions={[
        isLoadingUser,
        isLoadingRemoveAddress
      ]}
      RenderingConditions={[!!user, !!user?.addresses?.length]}
    >
      < div className="container mx-auto p-4" >
        <h2 className="text-2xl font-bold mb-4">Address:</h2>
        {
          user.addresses.map(address => (
            <AddressCard key={address._id} address={address} RemoveAddress={RemoveAddress} noOfAddress={user.addresses.length} />
          ))
        }
      </div >
    </Container >
  )
};


export default AddressRemovalForm;
