import React from 'react';
import { useFetchWishlistQuery } from './wishlistSlice';
import { Link } from 'react-router-dom';

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

  const { data: { wishlist = [] } = {}, isLoading: isLoadingWishlist } = useFetchWishlistQuery()

  console.log(wishlist);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Favourites</h2>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {wishlist.map((product) => (
          <div key={product.productId} className="group relative border border-gray-300 p-2 rounded">
            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
              <img
                src={product.image}
                alt={product.product_name}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link to={`/product-details/${product.productId}`}>
                    <span aria-hidden="true" className="inset-0" />
                    {product.product_name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                <p className="mt-1 text-sm text-gray-500">{product.size}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">₹{product.price}</p>
            </div>
            <div className="mt-2">
              {/* <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"> */}
              {/* <option>Size</option>
              </select> */}

              {/* <button className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={}
              >
                Add to cart
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
