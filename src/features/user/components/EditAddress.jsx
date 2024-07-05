import React, { useState, memo } from 'react';
import { useUser } from '../../../custom-hooks/useUser';

const AddressCard = memo(function ({ address, HandleRemoveAddress }) {
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
      <button
        onClick={() => HandleRemoveAddress(address._id)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Remove Address
      </button>
    </div>
  )
})

const AddressRemovalForm = () => {

  const { user, HandleRemoveAddress } = useUser()

  return (
    (user && user.addresses.length && < div className="container mx-auto p-4" >
      <h2 className="text-2xl font-bold mb-4">Address:</h2>
      {
        user.addresses.map(address => (
          <AddressCard key={address._id} address={address} HandleRemoveAddress={HandleRemoveAddress} />
        ))
      }
    </div >)
  );
};


export default AddressRemovalForm;
