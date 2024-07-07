import React, { useState, Fragment, useEffect } from 'react'
import { ProductGrid, Pagination } from '../../components/index.js'
import { Filter, MobileFilter, SortMenu } from './components/Filter'
import { useFilter } from '../../custom-hooks/useFilter.js'


function ProductList() {

  const { products } = useFilter()

  

  console.log(products);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="bg-white ">
      <MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sticky top-0">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6  ">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">All Products</h1>
          <SortMenu setMobileFiltersOpen={setMobileFiltersOpen} />
        </div>
        <section aria-labelledby="products-heading" className="pb-24 pt-6 flex">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <div className='sticky top-[20px] hidden lg:block h-screen'>
              <Filter />
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