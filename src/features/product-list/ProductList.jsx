import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu, MenuItem, MenuItems, MenuButton, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { fetchProductsAsync } from './ProductSlice'
import { fetchProductOwnersAsync, fetchUserAsync } from '../user/userSlice'
import { FailedMessage, ProductGrid, Pagination } from '../../components/index.js'
import { Filter, MobileFilter } from './components/Filter'


function ProductList() {

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const sortOptions = [
    { name: 'Best Rating', sort: 'rating', order: '-1' },
    { name: 'Price: Low to High', sort: 'price', order: '1' },
    { name: 'Price: High to Low', sort: 'price', order: '-1' },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const [filter, setFilter] = useState({})
  const products = useSelector(state => state.product.products);
  const productOwners = useSelector(state => state.user.productOwners)

  const dispatch = useDispatch()

  function handleChange(e, field, value) {

    console.log(value);

    setFilter((prevFilter) => {

      let newFilter = { ...prevFilter }

      // when checked
      if (e.target.checked) {
        if (field === 'price') {
          newFilter[field] = value.split(',')
        }
        if (field === 'category' || field === 'product_owners') {
          (newFilter[field] ??= []).push(value)
        }
        if (field === 'discount') {
          newFilter[field] = value
        }
      }
      // when unchecked
      else {
        if (field === 'category' || field === 'product_owners') {
          const index = newFilter[field].indexOf(value)
          newFilter[field].splice(index, 1)
          if (!newFilter[field].length)
            delete newFilter[field]
        }
        else {
          delete newFilter[field]
        }
      }
      return newFilter
    })
  }

  useEffect(() => {

    let queryString = '';

    // Helper function to append a parameter to the query string
    const appendParam = (key, value) => {
      if (value !== undefined && value !== '') {
        queryString += queryString ? `&&${key}=${value}` : `${key}=${value}`;
      }
    };

    // Process discount
    appendParam('discount', filter.discount);

    // Process product_owners
    if (filter.product_owners && filter.product_owners.length > 0 && filter.product_owners[0] !== '') {
      appendParam('product_owners', filter.product_owners.join(','));
    }

    // Process category
    if (filter.category && filter.category.length > 0 && filter.category[0] !== '') {
      appendParam('category', filter.category.join(','));
    }

    // Process price
    if (filter.price && filter.price.length) {
      const [min, max] = filter.price;
      appendParam('min_price', min);
      if (max)
        appendParam('max_price', max);
    }

    // Process sort
    if (filter.sort && filter.sort.length > 0) {
      filter.sort.forEach(sortObj => {
        if (sortObj.field && sortObj.order) {
          appendParam(`sort[${sortObj.field}]`, sortObj.order);
        }
      });
    }

    console.log(queryString); // Output: discount=10&&product_owners=owner1,owner2&&category=smartphone,laptop&&min_price=10&&max_price=100&&sort[price]=1&&sort[rating]=-1

    dispatch(fetchProductsAsync(queryString))
  }
    , [filter])

  useEffect(() => {
    dispatch(fetchUserAsync())
  }, [])

  const handleSort = (field, order) => {

    setFilter((prevFilter) => {

      let newFilter = { ...prevFilter }

      // remove 
      if (newFilter.sort) {
        // when the field to sort already exists then remove it
        let index = newFilter.sort.findIndex(s => {
          if (s.field === field) {
            // when given field order not matches then add given field
            if (s.order !== order)
              newFilter.sort.push({ field, order })
            return true
          }
          return false
        })
        // when the field exists then remove it
        if (index !== -1)
          newFilter.sort.splice(index, 1)
        else
          newFilter.sort.push({ field, order })
      }
      else
        (newFilter.sort ??= []).push({ field, order })

      return newFilter
    }
    )
  }

  return (
    <div className="bg-white overflow-hidden">
      <MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} handleChange={handleChange} />
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
                      <MenuItem key={option.name}>
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
                      </MenuItem>
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
            <div className='sticky top-[20px] hidden lg:block h-screen'>
              <Filter  handleChange={handleChange} />
            </div>
            {/* Product grid */}
            <ProductGrid products={products} />
          </div>
        </section>
        <Pagination />
      </main>
    </div>
  )
}

export default ProductList