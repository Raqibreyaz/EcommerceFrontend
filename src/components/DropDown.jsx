// import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
// import {
//   ArchiveBoxXMarkIcon,
//   ChevronDownIcon,
//   PencilIcon,
//   Square2StackIcon,
//   TrashIcon,
// } from '@heroicons/react/16/solid'

// export default function Example() {
//   return (
//     <div className="fixed top-24 w-52 text-right">
//       <Menu __demoMode>
//         <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
//           Options
//           <ChevronDownIcon className="size-4 fill-white/60" />
//         </MenuButton>
//         <Transition
//           enter="transition ease-out duration-75"
//           enterFrom="opacity-0 scale-95"
//           enterTo="opacity-100 scale-100"
//           leave="transition ease-in duration-100"
//           leaveFrom="opacity-100 scale-100"
//           leaveTo="opacity-0 scale-95"
//         >
//           <MenuItems
//             anchor="bottom end"
//             className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
//           >
//             <MenuItem>
//               <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                 <PencilIcon className="size-4 fill-white/30" />
//                 Edit
//                 <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘E</kbd>
//               </button>
//             </MenuItem>
//             <MenuItem>
//               <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                 <Square2StackIcon className="size-4 fill-white/30" />
//                 Duplicate
//                 <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
//               </button>
//             </MenuItem>
//             <div className="my-1 h-px bg-white/5" />
//             <MenuItem>
//               <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                 <ArchiveBoxXMarkIcon className="size-4 fill-white/30" />
//                 Archive
//                 <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘A</kbd>
//               </button>
//             </MenuItem>
//             <MenuItem>
//               <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
//                 <TrashIcon className="size-4 fill-white/30" />
//                 Delete
//                 <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
//               </button>
//             </MenuItem>
//           </MenuItems>
//         </Transition>
//       </Menu>
//     </div>
//   )
// }

// import { Fragment } from 'react'
// import { Disclosure, MenuButton, Menu, MenuItem, MenuItems, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react'
// import { Link } from 'react-router-dom'

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

// function DropDown() {
//     return (
//         <Menu as="div" className="relative ml-3 size-10 border">
//             <div>
//                 <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                     <span className="absolute -inset-1.5" />
//                     <span className="sr-only">Open user menu</span>
//                     <img className="h-8 w-8 rounded-full" src='' alt="" />
//                 </MenuButton>
//             </div>
//             <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//             >
//                 <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     <MenuItem >
//                         {({ active }) => (
//                             <Link
//                                 to=''
//                                 className={classNames(
//                                     active ? 'bg-gray-100' : '',
//                                     'block px-4 py-2 text-sm text-gray-700'
//                                 )}
//                             >
//                                 char baj gye
//                             </Link>
//                         )}
//                     </MenuItem>
//                     <MenuItem>
//                         {({ active }) => (
//                             <button
//                                 type='button'
//                                 className={classNames(
//                                     active ? 'bg-gray-100' : '',
//                                     'block px-4 py-2 text-sm text-gray-700 capitalize'
//                                 )}
//                                 onClick={() => handleLogout()}
//                             >
//                                 sign out
//                             </button>
//                         )}
//                     </MenuItem>
//                 </MenuItems>
//             </Transition>
//         </Menu>
//     )
// }

// export default DropDown

import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const handleLogout = () => {

};

function DropDown() {
    return (
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-2">
          <EllipsisVerticalIcon className="h-6 w-6 text-white" />
        </Menu.Button>
        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
export default DropDown  