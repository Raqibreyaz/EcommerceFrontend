import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gray-200 '>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border py-10">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
