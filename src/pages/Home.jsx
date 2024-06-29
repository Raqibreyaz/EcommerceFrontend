import React, { useDebugValue, useEffect } from 'react'
import Navbar from '../components/Navbar'
import ProductList from '../features/product-list/ProductList'
import { useDispatch } from 'react-redux'
import { fetchUserAsync } from '../features/user/userSlice'

function Home() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserAsync())
  }
  ,[])

  return (
    <div>
      <ProductList />
    </div>
  )
}

export default Home
