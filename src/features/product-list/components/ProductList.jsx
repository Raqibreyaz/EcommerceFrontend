import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, DialogPanel, Menu, MenuItems, MenuButton, Transition, TransitionChild, Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, StarIcon, EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { fetchCategoriesAsync, fetchProductsAsync } from '../ProductSlice'
import { Link, useNavigate } from 'react-router-dom'
import { fetchUserAsync } from '../../user/userSlice'
import { FailedMessage } from '../../../components/MessageDialog'
import { Filter, MobileFilter } from './Filter'

function ProductList() {

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const sortOptions = [
    { name: 'Best Rating', sort: 'rating', order: 'desc' },
    { name: 'Price: Low to High', sort: 'price', order: 'asc' },
    { name: 'Price: High to Low', sort: 'price', order: 'desc' },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [filter, setFilter] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserAsync())
    dispatch(fetchProductsAsync({}))
  }, [])

  function handleChange(e, field, value) {

    setFilter((prevFilter) => {
      if (field === 'price'){
        
      }
    })

    console.log('checked ', e.target.checked);
    console.log('field ', field);
    console.log('value', value.split(','));
  }

  const handleSort = (field, order) => {
    const newSort = { sort: field, order }
  }

  const products = useSelector(state => state.product.products);

  const productOwners = [...new Set(products.map(product => product.owner.fullname))]

  return (
    <div className="bg-white overflow-hidden">
      <div>
        <MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} productOwners={productOwners} handleChange={handleChange} />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sticky top-0">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6  ">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <div
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                              onClick={() => handleSort(option.sort, option.order)}
                            >
                              {option.name}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <section aria-labelledby="products-heading" className="pb-24 pt-6 flex">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <div className='sticky top-[20px]'>
                <form className="hidden lg:block h-screen">
                  <Filter productOwners={productOwners} handleChange={handleChange} />
                </form>
              </div>
              {/* Product grid */}
              <ProductGrid products={products} />
            </div>
          </section>
          <Pagination />
        </main>
      </div>
    </div>
  )
}

function ProductGrid({ products }) {

  // {id,thumbnail.url,price,rating,discount,owner.fullname}

  const Navigate = useNavigate();

  const error = useSelector(state => state.product.error)

  const [dropDown, setDropDown] = useState(false)

  return (
    <div className="lg:col-span-3 overflow-auto">
      {error && <FailedMessage title={error} />}
      <div className="bg-white">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 ">
          {products.map((product) => (
            // <div key={product._id} className="group relative border rounded p-2  duration-700" >
            //   <span className='absolute right-0' onClick={() => setDropDown(!dropDown)}>
            //     <DropDown />
            //   </span>
            //   <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none  lg:h-80" onClick={() => Navigate(`/product-details/${product._id}`)}>
            //     <img
            //       src={product.thumbnail.url}
            //       className="h-full w-full  lg:h-full lg:w-full"
            //     />
            //   </div>
            //   <div className="mt-4 flex justify-between">
            //     <div>
            //       <h3 className="text-sm text-gray-700">
            //         <span aria-hidden="true" className="absolute inset-0" />
            //         {product.product_name}
            //       </h3>
            //       <p className="mt-1 text-sm text-gray-500 flex items-center">
            //         <StarIcon className='h-6 w-6' />  {product.rating}
            //       </p>
            //     </div>
            //     <div>
            //       <p className="text-sm font-medium text-gray-900">${Math.round(product.price * (1 - product.discount * 0.01))}</p>
            //       {product.discount != 0 && <p className={`text-sm ${product.discount != 0 ? 'line-through' : ''} text-gray-400`}>${product.price}</p>}
            //     </div>
            //   </div>
            // </div>
            <div key={product._id} className="group relative border rounded p-2 duration-700" onClick={() => Navigate(`/product-details/${product._id}`)}>
              <div
                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80"

              >
                <img
                  src={product.thumbnail.url}
                  className="h-full w-full object-cover lg:h-full lg:w-full"
                  alt={product.product_name}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.product_name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 flex items-center">
                    <StarIcon className="h-6 w-6 text-yellow-500" /> {product.rating}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    ${Math.round(product.price * (1 - product.discount * 0.01))}
                  </p>
                  {product.discount !== 0 && (
                    <p className={`text-sm ${product.discount !== 0 ? 'line-through' : ''} text-gray-400`}>
                      ${product.price}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Pagination() {

  const totalPages = useSelector(state => state.product.totalPages)
  const filteredTotal = useSelector(state => state.product.filteredTotal)
  const overallTotal = useSelector(state => state.product.overallTotal)

  const [page, setPage] = useState(1)

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <Link
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredTotal}</span> of{' '}
            <span className="font-medium">{filteredTotal}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <Link
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              // onClick={ }
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </Link>
            <Link
              // onClick={ }
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </Link>
            <Link
              // onClick={ }
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </Link>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <Link
              // onClick={ }
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </Link>
            <Link
              // onClick={ }
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              9
            </Link>
            <Link
              // onClick={ }
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              10
            </Link>
            <Link
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}


export default ProductList