import { Fragment } from 'react'
import { Disclosure, MenuButton, Menu, MenuItem, MenuItems, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useFetchUserQuery, useLogoutUserMutation } from '../features/user/userSlice'
import { catchAndShowMessage } from '../utils/catchAndShowMessage'
import { Container } from './index'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Navbar() {

  const userNavigation = [
    { name: 'Your Profile', to: '/profile' },
    { name: 'My Orders', to: '/orders' },
    { name: 'My Wishlist', to: '/wishlist' },
  ]

  const { data: { user } = {} } = useFetchUserQuery()
  const [LogoutUser] = useLogoutUserMutation()

  const isAuthenticated = user ? true : false

  const userDetails = {
    fullname: user?.fullname || '',
    email: user?.email || '',
    avatar: user?.avatar.url || ''
    // 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }

  const Navigate = useNavigate()

  const navigation = []

  if (user && user.role === 'admin')
    navigation.push({ name: 'Dashboard', to: '/dashboard', current: true })

  if (user && (user.role === 'admin' || user.role === 'seller'))
    navigation.push({ name: 'AddProduct', to: '/add-product', current: true })

  if (!isAuthenticated) {
    navigation.push({ name: 'Login', to: '/login', current: true })
    navigation.push({ name: 'signup', to: "/signup", current: true })
  }


  return (
    <>
      <div className="min-h-full bg-red-400 sticky -top-0 z-10">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    {/* logo */}
                    <Link to='/' className="flex-shrink-0 mt-10">
                      <svg viewBox="20 -20 220 150" xmlns="http://www.w3.org/2000/svg" style={{ width: '150px', height: 'auto' }}>
                        <defs>
                          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%">
                            <stop offset="0%" style={{ stopColor: 'rgba(0,0,0,0.4)', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'rgba(0,0,0,0.2)', stopOpacity: 1 }} />
                          </linearGradient>
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
                          <g transform="translate(20, 0)">
                            <path d="M6 6h2l4 14h16l4-14h2" stroke="white" strokeWidth="2" fill="none" />
                            <circle cx="10" cy="24" r="4" fill="white" />
                            <circle cx="24" cy="24" r="4" fill="white" />
                            <path d="M8 6l2 2h16l2-2" stroke="white" strokeWidth="2" fill="none" />
                          </g>
                          <text x="60" y="30" fontFamily="'Brush Script MT', cursive" fontSize="30" fill="white" fontStyle="italic">Banaras Mart</text>
                        </g>
                      </svg>

                    </Link>
                    {/* desktop navElements */}
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            className={
                              classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
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

                      <Link to='/message-form' className='size-8 text-gray-400 hover:text-white mr-5'>
                        <ChatBubbleOvalLeftEllipsisIcon />
                      </Link>

                      < Link to='/cart'
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-2"
                      >
                        {/* <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 absolute">266</span> */}
                        <ShoppingCartIcon className="size-8 m-3" aria-hidden="true" />
                      </Link>

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
                    RenderingConditions={[!!isAuthenticated]}
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
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      to={item.to}
                      className={classNames(
                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block rounded-md px-3 py-2 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}

                </div>
                <Container
                  RenderingConditions={[!!isAuthenticated]}
                  className="border-t border-gray-700 pb-3 pt-4"
                >
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={userDetails.avatar} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{userDetails.fullname}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{userDetails.email}</div>
                    </div>
                    <Link to='/cart'
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 absolute">266</span>
                      <ShoppingCartIcon className="h-6 w-6 m-4" aria-hidden="true" />
                    </Link>
                  </div>
                  {/* profile setting and sign out link */}
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        to={item.to}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </DisclosureButton>
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
          )}
        </Disclosure>
      </div >
    </>
  )
}