import { useMemo } from 'react'
import { Container } from '../../components/index.js'
import { CartItem } from './components/CartItem'
import { AmountSection } from './components/AmountSection'
import { useAddProductToCartMutation, useFetchUserCartQuery, useRemoveProductFromCartMutation } from './cartSlice.js'


export default function Cart({ inCheckout = false }) {


  const [AddToCart, { isLoading: isLoadingAddToCart }] = useAddProductToCartMutation()

  const [RemoveFromCart, { isLoading: isLoadingRemoveFromCart }] = useRemoveProductFromCartMutation()

  const { data: { userCart = [] } = {}, isLoading: isLoadingCart,isFetching } = useFetchUserCartQuery()

  console.log(isFetching);

  const subTotal = useMemo(() => {
    return userCart.reduce((acc, { price, quantity }) => acc + price * quantity, 0)
  }, [userCart])

  // total discount will be the memoized value in the useMemo fucntion
  const totalDiscount = useMemo(() => {
    return Math.round(userCart.reduce((acc, { price, quantity, discount }) => acc + price * discount * quantity / 100, 0));
  }, [userCart])

  return (
    <Container
      LoadingConditions={[!!isLoadingCart, !!isLoadingAddToCart, !!isLoadingRemoveFromCart,!!isFetching]}
      RenderingConditions={[!!userCart, !!userCart?.length > 0]}
      backupElem={<h1 className='text-3xl capitalize text-center'>your cart is empty</h1>}
    >
      <div className="mt-8">
        <h1 className='text-3xl font-bold mb-2'>{!inCheckout ? "Cart" : 'Your Items'}</h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {
              userCart.map((product) => (
                <CartItem product={product} AddToCart={AddToCart} RemoveFromCart={RemoveFromCart}
                  key={product.product + product.size + product.color}
                />
              ))
            }
          </ul>
        </div>
      </div>
      <AmountSection totalDiscount={totalDiscount} subTotal={subTotal} inCheckout={inCheckout} />
    </Container>
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