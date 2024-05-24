import React from 'react'
import Navbar from '../components/Navbar'
import ProductList from '../features/product-list/ProductList'

function Home() {
  return (
    <div>
      <Navbar/>
      <ProductList/>
    </div>
  )
}

export default Home
