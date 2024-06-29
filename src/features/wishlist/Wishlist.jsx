// import React, { useState } from 'react';

// const Wishlist = () => {
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: 'Wireless Headphones',
//       details: 'High-quality wireless headphones with noise cancellation.',
//       price: 99.99,
//       inStock: true,
//       image: 'https://images.unsplash.com/photo-1518441902118-fd92f39fae7c', // Replace with actual image URL
//     },
//     {
//       id: 2,
//       name: 'Smart Watch',
//       details: 'Feature-packed smartwatch with health tracking.',
//       price: 199.99,
//       inStock: false,
//       image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b', // Replace with actual image URL
//     },
//     {
//       id: 3,
//       name: 'Bluetooth Speaker',
//       details: 'Portable Bluetooth speaker with excellent sound quality.',
//       price: 49.99,
//       inStock: true,
//       image: 'https://images.unsplash.com/photo-1583286176825-9bfbf02c3b15', // Replace with actual image URL
//     },
//   ]);

//   const handleAddToCart = (id) => {
//     alert(`Added product ${id} to cart!`);
//   };

//   const handleRemove = (id) => {
//     setProducts(products.filter((product) => product.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       {/* Header Section */}
//       <header className="w-full bg-blue-600 text-white py-4 px-6 mb-6">
//         <h1 className="text-3xl font-bold">My Wishlist</h1>
//       </header>

//       {/* Main Content Section */}
//       <main className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
//               <p className="text-gray-600 mt-2">{product.details}</p>
//               <div className="mt-4">
//                 <span className="text-lg font-bold text-green-600">${product.price}</span>
//                 <span className={`ml-2 ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
//                   {product.inStock ? 'In Stock' : 'Out of Stock'}
//                 </span>
//               </div>
//               <div className="mt-4 flex space-x-2">
//                 <button
//                   className="flex-1 bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                   disabled={!product.inStock}
//                   onClick={() => handleAddToCart(product.id)}
//                 >
//                   Add to Cart
//                 </button>
//                 <button
//                   className="flex-1 bg-red-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
//                   onClick={() => handleRemove(product.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </main>
//     </div>
//   );
// };

// export default Wishlist;


import React from 'react';

const products = [
  {
    id: 1,
    name: 'Aquarium Logo',
    price: '$15',
    color: 'Beige',
    imageUrl: "https://plus.unsplash.com/premium_photo-1664201889922-66bc3c778c1e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D", // Replace with a real image URL
  },
  {
    id: 2,
    name: 'Bottle Opener',
    price: '$12',
    color: 'Brown',
    imageUrl: 'https://images.unsplash.com/photo-1615833843615-884a03a10642?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGVjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D', // Replace with a real image URL
  },
  {
    id: 3,
    name: 'Slip-on Shoe',
    price: '$59',
    color: 'Brown',
    imageUrl: 'https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90', // Replace with a real image URL
  },
  {
    id: 4,
    name: 'Audio Equipment',
    price: '$29',
    color: 'Brown',
    imageUrl: 'https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90', // Replace with a real image URL
  },
];

const ProductList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Favourites</h2>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href="#">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.price}</p>
            </div>
            <div className="mt-2">
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                <option>Size</option>
              </select>
              <button className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
