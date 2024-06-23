import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { StarIcon, HeartIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductAsync, fetchProductDetailsAsync } from '../../ProductSlice'
import { addProductToCartAsync, fetchUserCartAsync } from '../../../cart/cartSlice'
import DescriptionDetailsAndHighlights from './DescriptionDetailsAndHighlights'
import ImageGallery from './ImageGallery'
import ProductDetailsNav from './ProductDetailsNav'
import ReviewComponent from '../Reviews'
import { showConfirmation } from '../../../../components/ConfirmDialog'
import { SuccessMessage, FailedMessage } from '../../../../components/MessageDialog'
import Loader from '../../../../components/Loader'

const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {

  const productId = useParams().id

  const dispatch = useDispatch()

  const providedProduct = useSelector(state => state.product.currentProduct)

  console.log(providedProduct);

  const status = useSelector(state => state.product.status)

  const product = {
    name: providedProduct.product_name,
    price: 'Rs. ' + providedProduct.price,
    href: '/',
    breadcrumbs: [
      { id: 1, name: 'Women', href: '#' },
      { id: 2, name: 'Clothing', href: '#' },
    ],
    colors: providedProduct.colors.map(({ color, images }) => ({
      name: color,
      class: color,
      selectedClass: 'ring-gray-400',
      images
    })),
    sizes: providedProduct.sizes.map(size => (
      { name: size, inStock: true })
    ),
    description: providedProduct.description,
    highlights: providedProduct.keyHighlights,
    details: providedProduct.details,
  }

  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')

  const userCart = useSelector(state => state.cart.userCart)

  // console.log(userCart);

  let [isAddedToCart, setIsAddedToCart] = useState(false)

  console.log('added to cart ', isAddedToCart);


  const AddToCart = (x) => {
    x.preventDefault()
    let data = {
      productId,
      color: selectedColor.color,
      size: selectedSize,
      quantity: 1
    }
    console.log(data);
    dispatch(addProductToCartAsync(data))
      .then(() => {
        if (status === 'idle')
          setIsAddedToCart(true)
        dispatch(fetchUserCartAsync())
      })

  }

  const handleDelete = async () => {
    let result = await showConfirmation('Delete Product', 'Do You Really Want To Delete the Product')
    if (result.isConfirmed)
      SuccessMessage('product deleted successfully')
    if (result.isDenied)
      SuccessMessage('something went wrong')
  }


  useEffect(() => {
    dispatch(fetchProductDetailsAsync(productId))
    dispatch(fetchUserCartAsync())
  }
    , [])

  useEffect(() => {
    console.log('selectedColor', selectedColor);
    console.log('selectedSize', selectedSize);

    let check = false;

    console.log('color available ', check);
    console.log(userCart);

    for (const prdct of userCart) {
      if (prdct.product === productId && selectedColor.color === prdct.color && selectedSize === prdct.size) {
        check = true
        break;
      }
    }

    setIsAddedToCart(check)
  }, [userCart, selectedColor, selectedSize])

  useEffect(() => {
    setSelectedColor(providedProduct.colors.length ? providedProduct.colors[0] : '')
    setSelectedSize(providedProduct.sizes.length ? providedProduct.sizes[0] : '')
  }, [providedProduct]);

  return (
    status === 'loading' ? <Loader /> :
      <div className="bg-white">

        <div className="pt-6">
          <ProductDetailsNav product={product} />
          {/* Image gallery */}
          <ImageGallery selectedColor={selectedColor} />

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              <form onSubmit={AddToCart} className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className={({ focus, checked }) =>
                            classNames(
                              color.selectedClass,
                              focus && checked ? 'ring ring-offset-1' : '',
                              !focus && checked ? 'ring-2' : '',
                              'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                            )
                          }
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              `h-8 w-8 ${selectedColor.color === color.name ? 'scale-75' : ''} rounded-full border border-black border-opacity-10`
                            )}
                            style={{ backgroundColor: color.class }}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size.name}
                          disabled={!size.inStock}
                          className={({ focus }) =>
                            classNames(
                              size.inStock
                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                              focus ? 'ring-2 ring-indigo-500' : '',
                              'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                            )
                          }
                        >
                          {({ checked, focus }) => (
                            <>
                              <span>{size.name}</span>
                              {size.inStock ? (
                                <span
                                  className={classNames(
                                    checked ? 'border-indigo-500' : 'border-transparent',
                                    focus ? 'border' : 'border-2',
                                    'pointer-events-none absolute -inset-px rounded-md'
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                    {/* <Compo /> */}
                  </fieldset>
                </div>

                {
                  !isAddedToCart ? <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add to Cart
                  </button> : <Link to='/cart' className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Go To Cart</Link>
                }
                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center rounded-md border  px-8 py-3 text-base font-medium text-black hover:bg-gray-600-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <HeartIcon className='text-black size-10' />
                  Add To WishList
                </button>
                <Link to={`/edit-product/${providedProduct._id}`} className='mt-3 font-semibold mx-auto cursor-pointer flex capitalize' >
                  <TrashIcon className='size-5 text-yellow-700' />
                  edit Product
                </Link>
                <span className='mt-3 font-semibold mx-auto cursor-pointer flex' onClick={() => handleDelete()}>
                  <TrashIcon className='size-5 text-red-700' />
                  Delete Product
                </span>
              </form>
            </div>
            <DescriptionDetailsAndHighlights product={product} />
          </div>
          <div>
            <ReviewComponent />
          </div>
        </div>
      </div >
  )
}


// const product = {
//   name: 'Basic Tee 6-Pack',
//   price: '$192',
//   href: '#',
//   breadcrumbs: [
//     { id: 1, name: 'Men', href: '#' },
//     { id: 2, name: 'Clothing', href: '#' },
//   ],
// images: [
//   {
//     src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
//     alt: 'Two each of gray, white, and black shirts laying flat.',
//   },
//   {
//     src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
//     alt: 'Model wearing plain black basic tee.',
//   },
//   {
//     src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
//     alt: 'Model wearing plain gray basic tee.',
//   },
//   {
//     src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
//     alt: 'Model wearing plain white basic tee.',
//   },
// ],
//   colors: [
//     { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//     { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//     { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
//   ],
//   sizes: [
//     { name: 'XXS', inStock: false },
//     { name: 'XS', inStock: true },
//     { name: 'S', inStock: true },
//     { name: 'M', inStock: true },
//     { name: 'L', inStock: true },
//     { name: 'XL', inStock: true },
//     { name: '2XL', inStock: true },
//     { name: '3XL', inStock: true },
//   ],
//   description: 'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
// highlights: [
//   'Hand cut and sewn locally',
//   'Dyed with our proprietary colors',
//   'Pre-washed & pre-shrunk',
//   'Ultra-soft 100% cotton',
// ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// }
