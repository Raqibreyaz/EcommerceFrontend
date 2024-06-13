import React from 'react';

const OrderCard = ({ order }) => {
  const statusColors = {
    pending: 'bg-yellow-200 text-yellow-800',
    delivered: 'bg-green-200 text-green-800',
    cancelled: 'bg-red-200 text-red-800',
    returned: 'bg-gray-200 text-gray-800'
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
      <div className="p-4">
        {/* Product Images */}
        <div className="flex mb-4 space-x-4">
          {order.products.map((product, index) => (
            <img
              key={index}
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-md"
            />
          ))}
        </div>
        {/* Order Amount and Date */}
        <div className="mb-4">
          <p className="text-gray-600 mb-1">Order Amount: ${order.amount}</p>
          <p className="text-gray-600">Order Date: {new Date(order.date).toLocaleDateString()}</p>
        </div>
        {/* Order Status */}
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status.toLowerCase()]}`}>
          {order.status}
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-2 flex justify-between items-center">
        <button className="text-blue-500 font-semibold hover:text-blue-700">View Details</button>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  // Sample orders data within the component
  const orders = [
    {
      orderId: '1',
      products: [
        { image: 'https://m.media-amazon.com/images/I/71kZfQA-Y7L._AC_UY218_.jpg', name: 'Product 1' },
        { image: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UY218_.jpg', name: 'Product 2' },
        { image: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UY218_.jpg', name: 'Product 2' },
        { image: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UY218_.jpg', name: 'Product 2' }
      ],
      amount: 150,
      date: '2023-06-01',
      status: 'Pending'
    },
    {
      orderId: '2',
      products: [
        { image: 'https://m.media-amazon.com/images/I/61pXO4JeKaL._AC_UY218_.jpg', name: 'Product 3' }
      ],
      amount: 250,
      date: '2023-05-15',
      status: 'Delivered'
    },
    // Add more orders as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold mb-6">Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <OrderCard key={order.orderId} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
