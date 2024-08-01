import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gray-200 '>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 border sm:py-10 max-sm:text-sm">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
