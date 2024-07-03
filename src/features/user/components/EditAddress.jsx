import React, { useState } from 'react';

const AddressRemovalForm = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, houseNo: 'x 19/', city: 'fufurinagar', state: 'dholakpur', pincode: '876543' },
    { id: 2, houseNo: 'j 19/', city: 'fufurinagar', state: 'dholakpur', pincode: '876543' },
  ]);

  const removeAddress = (id) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Address:</h2>
      {addresses.map(address => (
        <div key={address.id} className="bg-white p-4 rounded shadow mb-4">
          <div className="mb-2">
            <span className="font-bold">House No:</span> {address.houseNo}
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
            onClick={() => removeAddress(address.id)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Remove Address
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddressRemovalForm;
