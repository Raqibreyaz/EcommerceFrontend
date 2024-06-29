import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserCartAsync, addProductToCartAsync, removeProductFromCartAsync, clearError, clearSuccess } from './cartSlice'
import { Loader, showConfirmation, SuccessMessage, FailedMessage } from '../../components/index.js'
import { CartItem } from './components/CartItem'
import { AmountSection } from './components/AmountSection'


export default function Cart({ inCheckout = false }) {

  const userCart = useSelector(state => state.cart.userCart)
  const status = useSelector(state => state.cart.status)
  const success = useSelector(state => state.cart.success)
  const error = useSelector(state => state.cart.error)

  let subTotal = 0
  let totalDiscount = 0
  userCart.forEach(({ price, quantity, discount }) => {
    subTotal += (price * quantity)
    totalDiscount += price * discount * quantity / 100
  })

  const dispatch = useDispatch()

  if (success) {
    SuccessMessage(success)
      .then(() => dispatch(clearSuccess()))
  }
  if (error) {
    FailedMessage(error)
      .then(() => dispatch(clearError()))
  }

  useEffect(() => {
    dispatch(fetchUserCartAsync())
  }, [])

  const [open, setOpen] = useState(true)

  return (
    status === 'loading' ? <Loader /> :
      (userCart.length > 0 ? <div>
        <div className="mt-8">
          <h1 className='text-3xl font-bold mb-2'>{!inCheckout ? "Cart" : 'Your Items'}</h1>
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {
                userCart.map((product) => (
                  <CartItem product={product}
                    key={product.product + product.size + product.color}
                  />
                ))
              }
            </ul>
          </div>
        </div>
        <AmountSection totalDiscount={totalDiscount} subTotal={subTotal} inCheckout={inCheckout} />
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