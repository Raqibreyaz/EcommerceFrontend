import React, { useState } from 'react';

const Wishlist = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      details: 'High-quality wireless headphones with noise cancellation.',
      price: 99.99,
      inStock: true,
      image: 'https://images.unsplash.com/photo-1518441902118-fd92f39fae7c', // Replace with actual image URL
    },
    {
      id: 2,
      name: 'Smart Watch',
      details: 'Feature-packed smartwatch with health tracking.',
      price: 199.99,
      inStock: false,
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b', // Replace with actual image URL
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      details: 'Portable Bluetooth speaker with excellent sound quality.',
      price: 49.99,
      inStock: true,
      image: 'https://images.unsplash.com/photo-1583286176825-9bfbf02c3b15', // Replace with actual image URL
    },
  ]);

  const handleAddToCart = (id) => {
    alert(`Added product ${id} to cart!`);
  };

  const handleRemove = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header Section */}
      <header className="w-full bg-blue-600 text-white py-4 px-6 mb-6">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
      </header>
      
      {/* Main Content Section */}
      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mt-2">{product.details}</p>
              <div className="mt-4">
                <span className="text-lg font-bold text-green-600">${product.price}</span>
                <span className={`ml-2 ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  className="flex-1 bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </button>
                <button
                  className="flex-1 bg-red-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Wishlist;
