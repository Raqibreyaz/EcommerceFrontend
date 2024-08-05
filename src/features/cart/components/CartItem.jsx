import React, { memo } from 'react'
import { TrashIcon } from '@heroicons/react/20/solid'
import { showConfirmation } from '../../../components/ConfirmDialog'
import { Link } from 'react-router-dom'
import ColorNamer from 'color-namer'
import { catchAndShowMessage } from '../../../utils/catchAndShowMessage'

export const CartItem = memo(function ({ product, AddToCart, RemoveFromCart, totalAmount }) {
  return (
    <div>
      {
        <li className="flex flex-col py-6 mb-2 gap-3">
          <div className='flex'>
            <div className="size-36 max-sm:size-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={product.image}
                alt={''}
                className="size-full"
              />
            </div>
            <div className="sm:ml-4 ml-2 flex flex-1 flex-col">
              {/* name and amount */}
              <div className="flex w-full justify-between text-base font-medium text-gray-900">
                <h3 className='font-semibold capitalize'>
                  <Link to={`/product-details/${product.product}`}>
                    {product.product_name}
                  </Link>
                </h3>
                <p className="ml-4 max-sm:text-sm">
                  <span className='block'>₹{totalAmount}</span>
                  <span className='line-through text-xs text-gray-400'>₹{product.price * product.quantity}</span>
                </p>
              </div>
              {/* color and size */}
              <div className='space-y-3'>
                <p className="text-sm text-gray-500">{ColorNamer(product.color).ntc[0].name}</p>
                <p className=" text-sm text-gray-500 inline">{product.size}</p>
              </div>
              {/* quantity and remove */}
            </div>
          </div>
          <div className="flex  items-center justify-between text-sm max-sm:text-xs">

            {/* quantity */}
            <div className="text-gray-900 flex gap-2 items-start ">
              <span className='font-semibold'>Qty:</span>
              <p className='flex items-center gap-2 border rounded-3xl  px-2'>
                <select value={product.quantity} onChange={(e) => {
                  AddToCart(
                    {
                      id: product.product,
                      color: product.color,
                      size: product.size,
                      quantity: e.target.value
                    })
                }} className='px-2'>
                  {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((count) => (
                      <option value={count} key={count} className='bg-gray-500 text-white'>{count}</option>
                    ))
                  }
                </select>
              </p>
            </div>

            {/* remove button */}
            <div className="flex">
              <button
                type="button"
                className="font-medium text-red-500 max-sm:text-xs text-sm hover:text-red-600 flex"
                onClick={() => {
                  showConfirmation('Remove Product', 'Do you Really Want to Remove The Product').then((result) => {
                    if (result.isConfirmed) catchAndShowMessage(RemoveFromCart, { id: product.product, color: product.color, size: product.size })
                  })
                }}
              >
                <TrashIcon className='max-sm:size-4 size-5' />Remove
              </button>
            </div>
          </div>
        </li>
      }
    </div >
  )
})
