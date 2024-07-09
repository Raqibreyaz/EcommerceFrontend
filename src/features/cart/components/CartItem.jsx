import React, { memo } from 'react'
import { TrashIcon } from '@heroicons/react/20/solid'
import { showConfirmation } from '../../../components/ConfirmDialog'
import { Link } from 'react-router-dom'
import ColorNamer from 'color-namer'

export const CartItem = memo(function ({ product, AddToCart, RemoveFromCart }) {
  return (
    <div>
      {
        <li className="flex py-6 mb-2">
          <div className="size-36 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img
              src={product.image}
              alt={''}
              className="size-full"
            />
          </div>

          <div className="ml-4 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <Link to={`/product-details/${product.product}`}>{product.product_name}</Link>
                </h3>
                <p className="ml-4">
                  <span className='block'>{Math.round(product.price * product.quantity * (1 - product.discount / 100))}</span>
                  <span className='line-through'>{product.price * product.quantity}</span>
                </p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{ColorNamer(product.color).ntc[0].name}</p>
              <p className="mt-1 text-sm text-gray-500 inline">{product.size}</p>
            </div>
            <div className="flex flex-1 items-end justify-between text-sm">
              <div className="text-gray-500 flex gap-2 items-center ">Qty
                <p className='flex items-center gap-2 border rounded-3xl px-2'>
                  <select defaultValue={product.quantity} onChange={(e) => {
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

              <div className="flex">
                <button
                  type="button"
                  className="font-medium text-red-500 hover:text-red-600 flex"
                  onClick={() => {
                    showConfirmation('Remove Product', 'Do you Really Want to Remove The Product').then((result) => {
                      if (result.isConfirmed) RemoveFromCart({ id: product.product, color: product.color, size: product.size })
                    })
                  }}
                >
                  <TrashIcon className='size-5' />Remove
                </button>
              </div>
            </div>
          </div>
        </li>
      }
    </div >
  )
})
