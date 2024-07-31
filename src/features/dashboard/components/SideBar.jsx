import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/20/solid'
import React, { Fragment, memo } from 'react'
import { Link } from 'react-router-dom'

// const MobileSideBar = memo(({mobile}) => {
//     return (
//         < Transition show={mobileFiltersOpen} as={Fragment}>
//             <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
//                 <TransitionChild
//                     as={Fragment}
//                     enter="transition-opacity ease-linear duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="transition-opacity ease-linear duration-300"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <div className="fixed inset-0 bg-black bg-opacity-25" />
//                 </TransitionChild>

//                 <div className="fixed inset-0 z-40 flex">
//                     <TransitionChild
//                         as={Fragment}
//                         enter="transition ease-in-out duration-300 transform"
//                         enterFrom="translate-x-full"
//                         enterTo="translate-x-0"
//                         leave="transition ease-in-out duration-300 transform"
//                         leaveFrom="translate-x-0"
//                         leaveTo="translate-x-full"
//                     >
//                         <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
//                             <div className="flex items-center justify-between px-4">
//                                 <h2 className="text-lg font-medium text-gray-900">Filters</h2>
//                                 <button
//                                     type="button"
//                                     className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
//                                     onClick={() => setMobileFiltersOpen(false)}
//                                 >
//                                     <span className="sr-only">Close menu</span>
//                                     <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                                 </button>
//                             </div>

//                             {/* Filters */}
//                             <form className="mt-4 border-t border-gray-200 sticky top-0">
//                                 <h3 className="sr-only">Categories</h3>
//                                 <Filter px='px-4' />
//                             </form>
//                         </DialogPanel>
//                     </TransitionChild>
//                 </div>
//             </Dialog>
//         </Transition >
//     )
// })

const SideBar = memo(function SideBar() {
    return (
        < div className="w-64 max-sm:hidden bg-gray-800 h-screen sticky top-16 flex flex-col justify-between" >
            <div className="p-4 text-white">
                <h2 className="text-lg font-semibold mb-4">Actions</h2>
                <ul className="space-y-2">
                    {[
                        {
                            to: "/change-user-role",
                            child: 'change user role'
                        },
                        {
                            to: "/messages",
                            child: 'messages',
                        },
                        {
                            to: '/return-requests',
                            child: 'return requests'
                        }
                    ].map(({ to, child }) => (
                        <li key={to}>
                            <Link to={to} className="text-blue-500 capitalize hover:text-blue-200">
                                {child}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    )
})

export default SideBar
