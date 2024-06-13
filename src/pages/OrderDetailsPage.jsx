import React from 'react';

const OrderCard = ({ order }) => {
  const statusColors = {
    delivered: 'text-green-600',
    pending: 'text-yellow-600',
    cancelled: 'text-red-600',
    returned: 'text-gray-600'
  };

  return (
    <div className="bg-white shadow-lg rounded-lg w-full mb-0">
      <div className="p-6">
        {/* Order Summary */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-500 text-sm">Order number</p>
            <p className="text-black font-semibold">{order.orderNumber}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Date placed</p>
            <p className="text-black font-semibold">{order.datePlaced}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total amount</p>
            <p className="text-black font-semibold">${order.totalAmount}</p>
          </div>
        </div>
        {/* Products */}
        {order.items.map((item, index) => (
          <div key={index} className="flex mb-6 border-t pt-4">
            <div className="w-1/5">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
            <div className="w-4/5 pl-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-lg font-semibold">${item.price}</p>
              </div>
              <p className="text-gray-500 mb-4">{item.description}</p>
              <p className={`flex items-center font-semibold ${statusColors[order.status.toLowerCase()]}`}>
                <span className="mr-2">✔</span>
                Delivered on {item.deliveryDate}
              </p>
              <div className="flex space-x-4 mt-4">
                <button className="text-indigo-500 font-semibold hover:text-indigo-700">
                  View product
                </button>
                <button className="text-indigo-500 font-semibold hover:text-indigo-700">
                  Buy again
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
        <p className="text-gray-600 text-sm">Order actions</p>
        <button className="text-indigo-500 font-semibold hover:text-indigo-700">More options</button>
      </div>
    </div>
  );
};

const OrdersPage = () => {
  const orders = [
    {
      orderNumber: 'WU88191111',
      datePlaced: 'Jul 6, 2021',
      totalAmount: '160.00',
      status: 'delivered',
      items: [
        {
          image: 'https://m.media-amazon.com/images/I/71kZfQA-Y7L._AC_UY218_.jpg',
          name: 'Micro Backpack',
          price: '70.00',
          description: 'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
          deliveryDate: 'July 12, 2021'
        },
        {
          image: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UY218_.jpg',
          name: 'Nomad Shopping Tote',
          price: '90.00',
          description: 'This durable shopping tote is perfect for the world traveler. Its yellow canvas construction is water, fray, tear resistant. The matching handle, backpack straps, and shoulder loops provide multiple carry options for a day out on your next adventure.',
          deliveryDate: 'July 12, 2021'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Orders</h1>
      <div className="grid grid-cols-1  gap-8">
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;


// import React from 'react';

// const OrderCard = ({ order }) => {
//   const statusColors = {
//     delivered: 'text-green-600',
//     pending: 'text-yellow-600',
//     cancelled: 'text-red-600',
//     returned: 'text-gray-600'
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg w-full md:w-4/5 lg:w-1/3 mb-8 md:mb-0">
//       <div className="p-6">
//         {/* Order Summary */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//           <div className="mb-4 md:mb-0 md:w-1/3">
//             <p className="text-gray-500 text-sm">Order number</p>
//             <p className="text-black font-semibold">{order.orderNumber}</p>
//           </div>
//           <div className="mb-4 md:mb-0 md:w-1/3">
//             <p className="text-gray-500 text-sm">Date placed</p>
//             <p className="text-black font-semibold">{order.datePlaced}</p>
//           </div>
//           <div className="md:w-1/3">
//             <p className="text-gray-500 text-sm">Total amount</p>
//             <p className="text-black font-semibold">${order.totalAmount}</p>
//           </div>
//         </div>
//         {/* Products */}
//         {order.items.map((item, index) => (
//           <div key={index} className="flex mb-6 border-t pt-4">
//             <div className="w-1/3">
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-full h-auto object-cover rounded-md"
//               />
//             </div>
//             <div className="w-2/3 pl-6">
//               <div className="flex justify-between items-center mb-2">
//                 <p className="text-lg font-semibold">{item.name}</p>
//                 <p className="text-lg font-semibold">${item.price}</p>
//               </div>
//               <p className="text-gray-500 mb-4">{item.description}</p>
//               <p className={`flex items-center font-semibold ${statusColors[order.status.toLowerCase()]}`}>
//                 <span className="mr-2">✔</span>
//                 Delivered on {item.deliveryDate}
//               </p>
//               <div className="flex space-x-4 mt-4">
//                 <button className="text-indigo-500 font-semibold hover:text-indigo-700">
//                   View product
//                 </button>
//                 <button className="text-indigo-500 font-semibold hover:text-indigo-700">
//                   Buy again
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
//         <p className="text-gray-600 text-sm">Order actions</p>
//         <button className="text-indigo-500 font-semibold hover:text-indigo-700">More options</button>
//       </div>
//     </div>
//   );
// };

// const OrdersPage = () => {
//   const orders = [
//     {
//       orderNumber: 'WU88191111',
//       datePlaced: 'Jul 6, 2021',
//       totalAmount: '160.00',
//       status: 'delivered',
//       items: [
//         {
//           image: 'https://m.media-amazon.com/images/I/71kZfQA-Y7L._AC_UY218_.jpg',
//           name: 'Micro Backpack',
//           price: '70.00',
//           description: 'Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.',
//           deliveryDate: 'July 12, 2021'
//         },
//         {
//           image: 'https://m.media-amazon.com/images/I/81QpkIctqPL._AC_UY218_.jpg',
//           name: 'Nomad Shopping Tote',
//           price: '90.00',
//           description: 'This durable shopping tote is perfect for the world traveler. Its yellow canvas construction is water, fray, tear resistant. The matching handle, backpack straps, and shoulder loops provide multiple carry options for a day out on your next adventure.',
//           deliveryDate: 'July 12, 2021'
//         }
//       ]
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800">Orders</h1>
//       <div className="flex flex-wrap justify-center">
//         {orders.map((order, index) => (
//           <OrderCard key={index} order={order} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrdersPage;
