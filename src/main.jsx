import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx'
import Home from './pages/Home.jsx';
import CartPage from './pages/CartPage.jsx'
import Checkout from './pages/Checkout.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
    children: [
      {
        path: '',
        element: (<Home />)
      },
      {
        path: '/product-details',
        element: (<ProductDetailPage />)
      },
      {
        path: '/cart',
        element: (<CartPage />)
      },
      {
        path: '/checkout',
        element: (<Checkout />)
      },
      {
        path: '/login',
        element: (
          <LoginPage />
        )
      },
      {
        path: '/signup',
        element: (
          <SignupPage />
        )
      },
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
