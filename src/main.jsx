import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from '../app/store.js'
import { HomePage, CheckoutPage, EditProductPage, LoginPage, SignupPage, WishlistPage, ProductDetailPage, AddProductPage, CartPage, OrderDetailsPage, OrdersPage, DashBoardPage, MessageList, UserProfilePage, NotFoundPage } from './pages/index.js'
import Authenticate from './components/Authenticate.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App />
    ),
    children: [
      {
        path: '',
        element: (
          <Authenticate allowed={true}>
            <HomePage />
          </Authenticate>
        )
      },
      {
        path: '/product-details/:id',
        element: (
          <Authenticate allowed={true}>
            <ProductDetailPage />
          </Authenticate>
        )
      },
      {
        path: '/cart',
        element: (
          <Authenticate authState={true}>
            <CartPage />
          </Authenticate>
        )
      },
      {
        path: '/checkout',
        element: (
          <Authenticate authState={true}>
            <CheckoutPage />
          </Authenticate>
        )
      },
      {
        path: '/login',
        element: (
          <Authenticate authState={false}>
            <LoginPage />
          </Authenticate>
        )
      },
      {
        path: '/signup',
        element: (
          <Authenticate authState={false}>
            <SignupPage />
          </Authenticate>
        )
      },
      {
        path: '/add-product',
        element: (
          <Authenticate authState={true} roles={['admin', 'seller']}>
            <AddProductPage />
          </Authenticate>
        )
      },
      {
        path: '/edit-product/:id',
        element: (
          <Authenticate authState={true} roles={['admin', 'seller']}>
            <EditProductPage />
          </Authenticate>
        )
      },
      {
        path: '/dashboard',
        element: (
          <Authenticate authState={true} role={'admin'}>
            <DashBoardPage />
          </Authenticate>
        )
      },
      {
        path: '/orders',
        element: (
          <Authenticate authState={true}>
            <OrdersPage />
          </Authenticate>
        )
      },
      {
        path: '/order-details/:id',
        element: (
          <Authenticate authState={true}>
            <OrderDetailsPage />
          </Authenticate>
        )
      },
      {
        path: '/wishlist',
        element: (
          <Authenticate authState={true}>
            <WishlistPage />
          </Authenticate>
        )
      },
      {
        path: '/messages',
        element: (
          <Authenticate authState={true} role={'admin'}>
            <MessageList />
          </Authenticate>
        )
      },
      {
        path: '/profile',
        element: (
          <Authenticate authState={true}>
            <UserProfilePage />
          </Authenticate>
        )
      },
      {
        path: '*',
        element: (
          <NotFoundPage />
        )
      },
    ]
  },

]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode >,
)
