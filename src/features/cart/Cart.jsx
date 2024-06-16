import { Fragment, useEffect, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserCartAsync, addProductToCartAsync, removeProductFromCartAsync } from './cartSlice'
import Loader from '../../components/Loader'
import { TrashIcon } from '@heroicons/react/20/solid'
import { SuccessMessage, FailedMessage } from '../../components/MessageDialog'
import { showConfirmation } from '../../components/ConfirmDialog'


export default function Cart({ btnText = 'checkout', btnLink = '/checkout' }) {

  const userCart = useSelector(state => state.cart.userCart)
  const status = useSelector(state => state.cart.status)
  const success = useSelector(state => state.cart.success)
  const error = useSelector(state => state.cart.error)
  const Navigate = useNavigate()

  let subTotal = 0
  let totalDiscount = 0
  userCart.products.forEach(({ price, quantity, discount }) => {
    subTotal += (price * quantity)
    totalDiscount += price * discount * quantity / 100
  })

  console.log(userCart.products);

  let products = userCart.products.map((product) => (
    {
      id: product.product,
      name: product.product_name,
      href: `/product-details/${product.product}`,
      color: product.color,
      price: `Rs. ${product.price * product.quantity}`,
      quantity: product.quantity,
      imageSrc: product.image,
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
      size: product.size,
      discount: product.discount
    }
  ))

  const dispatch = useDispatch()

  const handleQuantity = (productId, color, size, quantity) => {
    console.log(quantity);
    let data = {
      productId,
      color,
      size,
      quantity
    }
    dispatch(addProductToCartAsync(data))
  }

  const handleRemove = async (productId, size, color) => {
    let result = await showConfirmation('Remove From Cart', 'Do You Really Want To Remove This Item', 'Remove')

    if (result.isConfirmed) {
      dispatch(removeProductFromCartAsync({ productId, size, color }))
    }

    if (btnText !== 'checkout')
      Navigate('/')
  }

  if (success) {
    console.log('success', success);
    SuccessMessage(success)
  }
  if (error)
    FailedMessage(error)

  useEffect(() => {
    dispatch(fetchUserCartAsync())
  }, [])

  const [open, setOpen] = useState(true)

  return (
    status === 'loading' ? <Loader /> :
      (products.length > 0 ? <div>
        <div className="mt-8">
          <h1 className='text-3xl font-bold mb-2'>{btnText === 'checkout' ? "Cart" : 'Your Items'}</h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-center object-cover"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.name}</a>
                        </h3>
                        <p className="ml-4">
                          <span>{product.price}</span>
                          <span className='block'>{product.price * (1 - product.discount / 100)}</span>
                          {/* <span>{product.discount}</span> */}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500 flex gap-2 items-center ">Qty
                        <p className='flex items-center gap-2 border rounded-3xl px-2'>
                          <select id="" defaultValue={product.quantity} onChange={(e) => handleQuantity(product.id, product.color, product.size, e.target.value)} className='px-2'>
                            {
                              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((count) => (
                                <option value={count} className='bg-gray-500 text-white'>{count}</option>
                              ))
                            }
                          </select>
                        </p>
                      </p>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-red-500 hover:text-red-600 flex"
                          onClick={() => handleRemove(product.id, product.size, product.color)}
                        >
                          <TrashIcon className='size-5' />Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{subTotal}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p className='capitalize'>total discount</p>
            <p>{totalDiscount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900 border-t  mt-2">
            <p className='capitalize'>grand total</p>
            <p>{subTotal - totalDiscount}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link
              to={btnLink}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              {btnText}
            </Link>
          </div>
          {btnText === 'checkout' && < div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
                onClick={() => setOpen(false)}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>}
        </div>
      </div > : <h1 className='text-3xl capitalize text-center'>your cart is empty</h1>)
  )
}

// [
//   {
//     id: 1,
//     name: 'Throwback Hip Bag',
//     href: '#',
//     color: 'Salmon',
//     price: '$90.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
//     imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   More products...
//   ]