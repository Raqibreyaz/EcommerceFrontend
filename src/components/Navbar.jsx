import { Fragment, memo, useEffect } from 'react'
import { Disclosure, MenuButton, Menu, MenuItem, MenuItems, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useFetchUserQuery, useLogoutUserMutation } from '../features/user/userSlice'
import { catchAndShowMessage } from '../utils/catchAndShowMessage'
import { Container } from './index'
import { userApi } from '../features/user/userSlice'
import dashboardApi from '../features/dashboard/dashboardSlice'
import { wishlistApi } from '../features/wishlist/wishlistSlice'
import { cartApi } from '../features/cart/cartSlice'
import { orderApi } from '../features/orders/orderSlice'
import { useDispatch } from 'react-redux'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const applyClass = ({ active, inActive, common }) => {
  return ({ isActive }) => (`${isActive ? active : inActive} ${common}`)
}

const Navbar = memo(function Navbar() {

  const userNavigation = [
    { name: 'Your Profile', to: '/profile' },
    { name: 'My Orders', to: '/orders' },
    { name: 'My Wishlist', to: '/wishlist' },
  ]

  const { data: { user = null } = {}, isLoading: isLoadingUser } = useFetchUserQuery()

  const [LogoutUser, { isLoading: isLoggingOutUser, isSuccess: isLogoutSuccessfull }] = useLogoutUserMutation()

  const isAuthenticated = !!user

  const dispatch = useDispatch()
  const Navigate = useNavigate()

  const userDetails = {
    fullname: user?.fullname || '',
    email: user?.email || '',
    avatar: user?.avatar.url || ''
  }

  const navigation = []

  navigation.push({ name: 'Home', to: '/' })

  if (user && user.role === 'admin')
    navigation.push({ name: 'Dashboard', to: '/dashboard' })

  if (user && (user.role === 'admin' || user.role === 'seller'))
    navigation.push({ name: 'AddProduct', to: '/add-product' })

  if (!isAuthenticated) {
    navigation.push({ name: 'Login', to: '/login' })
    navigation.push({ name: 'signup', to: "/signup" })
  }

  // when successfully logout then clear all the relevant cache and navigate to /
  useEffect(() => {
    if (isLogoutSuccessfull) {
      dispatch(userApi.util.resetApiState())
      dispatch(wishlistApi.util.resetApiState())
      dispatch(cartApi.util.resetApiState())
      dispatch(dashboardApi.util.resetApiState())
      dispatch(orderApi.util.resetApiState())
      Navigate('/')
    }
  }, [isLogoutSuccessfull])

  return (
    <Container
      className="min-h-full bg-red-400 z-10 sticky top-0"
      RenderingConditions={[!isLoadingUser, !isLoggingOutUser]}
    >
      <Disclosure as="nav" className="bg-gray-900">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  {/* logo */}
                  <div className="flex-shrink-0 items-center justify-center flex h-10 sm:w-52 w-44 pt-2">
                    <Link to='/' >
                      <svg viewBox="0 0 220 50" xmlns="http://www.w3.org/2000/svg"
                        className='sm:text-xl size-full'
                      >
                        <defs>
                          <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                            <feOffset dx="2" dy="2" result="offsetblur" />
                            <feFlood floodColor="rgba(0,0,0,0.5)" />
                            <feComposite in2="offsetblur" operator="in" />
                            <feMerge>
                              <feMergeNode />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        <g fill="white" filter="url(#shadow)">
                          <g transform="translate(0, 0)">
                            <path d="M6 6h2l4 14h16l4-14h2" stroke="white" strokeWidth="2" fill="none" />
                            <circle cx="10" cy="24" r="4" fill="white" />
                            <circle cx="24" cy="24" r="4" fill="white" />
                            <path d="M8 6l2 2h16l2-2" stroke="white" strokeWidth="2" fill="none" />
                          </g>
                          <text x="40" y="28" fontFamily="'Brush Script MT', cursive" fontSize="25" fill="white" fontStyle="italic">
                            Banaras Mart
                          </text>
                        </g>
                      </svg>
                    </Link>
                  </div>
                  {/* desktop navElements */}
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.to}
                          className={applyClass({
                            active: 'bg-pink-900 text-white',
                            inActive: 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            common: 'rounded-md px-3 py-2 text-sm font-medium capitalize'
                          })}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                {/* desktop cart and profile avatar */}
                <Container
                  RenderingConditions={[!!isAuthenticated]}
                  className="hidden md:block"
                >
                  <div className="ml-4 flex items-center md:ml-6">

                    <NavLink to='/message-form'
                      className={applyClass({
                        active: 'text-pink-700',
                        inActive: 'text-gray-400',
                        common: 'size-8 hover:text-white mr-5'
                      })}
                    >
                      <ChatBubbleOvalLeftEllipsisIcon />
                    </NavLink>

                    < NavLink to='/cart'
                      className={applyClass({
                        active: ' text-pink-700',
                        inActive: 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        common: "relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-2"
                      })}
                    >
                      <ShoppingCartIcon className="size-8 m-3" aria-hidden="true" />
                    </NavLink>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={userDetails.avatar} alt="" />
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
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <MenuItem key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.to}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </MenuItem>
                          ))}
                          <MenuItem>
                            {({ active }) => (
                              <button
                                type='button'
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700 capitalize'
                                )}
                                onClick={() => catchAndShowMessage(LogoutUser)}
                              >
                                sign out
                              </button>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </Container>
                {/* mobile hamburger and cross for open  */}
                <Container
                  className="-mr-2 flex md:hidden"
                >
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </Container>
              </div>
            </div>
            {/* mobile navElements */}
            <DisclosurePanel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 capitalize">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={applyClass({
                      active: 'bg-gray-900 text-pink-900',
                      inActive: 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      common: 'block rounded-md px-3 py-2 text-base font-medium'
                    })}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </NavLink>
                ))}

              </div>
              <Container
                RenderingConditions={[!!isAuthenticated]}
                className="border-t border-gray-700 pb-3 pt-4"
              >
                <div className="flex items-center sm:px-5 justify-between px-2">
                  <div className="flex-shrink-0 flex max-sm:flex-col gap-2 sm:items-center">
                    <img className="h-10 w-10 rounded-full" src={userDetails.avatar} alt="" />
                    <div className="">
                      <div className="text-base font-medium leading-none capitalize text-white">{userDetails.fullname}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{userDetails.email}</div>
                    </div>
                  </div>
                  <div>
                    <NavLink to='/message-form'
                      type="button"
                      className={applyClass({ active: 'text-pink-800', inActive: '', common: "relative  flex-shrink-0 rounded-full  text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" })}
                    >
                      <ChatBubbleOvalLeftEllipsisIcon className="size-8 m-4 text-inherit" aria-hidden="true" />
                    </NavLink>
                    <NavLink to='/cart'
                      type="button"
                      className={applyClass({ active: 'text-pink-800', inActive: '', common: "relative  flex-shrink-0 rounded-full  text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" })}
                    >
                      <ShoppingCartIcon className="size-8 m-4 text-inherit" aria-hidden="true" />
                    </NavLink>
                  </div>
                </div>
                {/* profile setting and sign out link */}
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      className={applyClass({
                        active: 'text-pink-900',
                        inActive: 'text-gray-400',
                        common: "block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-700 hover:text-white"
                      })}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  <DisclosureButton
                    as="button"
                    className="block w-full rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 capitalize hover:text-white"
                    onClick={() => catchAndShowMessage(LogoutUser)}
                  >
                    sign out
                  </DisclosureButton>
                </div>
              </Container>
            </DisclosurePanel>
          </>
        )
        }
      </Disclosure >
    </Container >
  )
})

export default Navbar