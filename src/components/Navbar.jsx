import { Fragment } from 'react'
import { Disclosure, MenuButton, Menu, MenuItem, MenuItems, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUserAsync, useFetchUserQuery } from '../features/user/userSlice'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function Navbar() {

  const userNavigation = [
    { name: 'Your Profile', to: '/profile' },
    { name: 'My Orders', to: '/orders' },
    { name: 'My Wishlist', to: '/wishlist' },
  ]

  const { data } = useFetchUserQuery()

  const user = data?.user

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
                    <Link to='/' className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
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
                  {
                    isAuthenticated && <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        < Link to='/cart'
                          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-2"
                        >
                          <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10 absolute">266</span>
                          <ShoppingCartIcon className="h-6 w-6 m-3" aria-hidden="true" />
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
                                    onClick={() => handleLogout()}
                                  >
                                    sign out
                                  </button>
                                )}
                              </MenuItem>
                            </MenuItems>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  }
                  {/* mobile hamburger and cross for open  */}
                  {
                    isAuthenticated && <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <DisclosureButton className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </DisclosureButton>
                    </div>
                  }
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
                {
                  isAuthenticated && <div className="border-t border-gray-700 pb-3 pt-4">
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
                        onClick={() => handleLogout}
                      >
                        sign out
                      </DisclosureButton>
                    </div>
                  </div>
                }
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div >
    </>
  )
}