import React, { useEffect, Fragment, memo } from 'react'
import { Dialog, DialogPanel, Menu, MenuItem, MenuItems, MenuButton, Transition, TransitionChild, Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useFilter } from '../../../custom-hooks/useFilter.js';
import { useUser } from '../../../custom-hooks/useUser.js';

const MobileFilter = memo(function ({ mobileFiltersOpen, setMobileFiltersOpen }) {

    console.log('hi mobile');

    return (
        < Transition show={mobileFiltersOpen} as={Fragment}>
            <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                <TransitionChild
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </TransitionChild>

                <div className="fixed inset-0 z-40 flex">
                    <TransitionChild
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    onClick={() => setMobileFiltersOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200 sticky top-0">
                                <h3 className="sr-only">Categories</h3>
                                <Filter px='px-4' />
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition >
    )
})

const Filter = memo(function ({ px = '' }) {

    const { categories, HandleFetchCategories, HandleFilterSelection } = useFilter()
    const { productOwners, HandleProductOwners } = useUser()

    useEffect(() => {
        HandleProductOwners()
        HandleFetchCategories()
    }
        , [])
    console.log('hi filter');
    return (
        <div>
            {
                [
                    {
                        id: 'category',
                        name: 'category',
                        type: 'checkbox',
                        options: categories.map(category => (
                            {
                                value: category.name,
                                label: category.name,
                                checked: false
                            }
                        ))
                    },
                    {
                        id: "pricing",
                        name: "price",
                        type: 'radio',
                        options: [
                            { name: "100 to 1k", value: '100,1000' },
                            { name: "1k to 5k", value: '1000,5000' },
                            { name: "5k to 10k", value: '5000,10000' },
                            { name: "10k or above", value: '10000' },
                        ].map((priceRange) => (
                            { value: priceRange.value, label: priceRange.name, checked: false }
                        ))
                    },
                    {
                        id: "discount",
                        name: "discount",
                        type: 'radio',
                        options: [
                            { name: "at least 10%", value: 10 },
                            { name: "at least 20%", value: 20 },
                            { name: "at least 30%", value: 30 },
                            { name: "at least 40%", value: 40 },
                        ].map((discount) => (
                            { value: discount.value, label: discount.name, checked: false }
                        ))
                    },
                    {
                        id: "product owners",
                        name: "product_owners",
                        type: 'checkbox',
                        options: productOwners.map((brand) => (
                            { value: brand._id, label: brand.fullname, checked: false }
                        ))
                    },
                ].map((section) => (
                    <Disclosure as="div" key={section.id} className={`border-b border-gray-200 ${px} py-6`}>
                        {({ open }) => (
                            <>
                                <h3 className="-my-3 flow-root">
                                    <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                        <span className="font-medium text-gray-900">{section.name}</span>
                                        <span className="ml-6 flex items-center">
                                            {open ? (
                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                            ) : (
                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                            )}
                                        </span>
                                    </DisclosureButton>
                                </h3>
                                <DisclosurePanel className="pt-6">
                                    <div className="space-y-4">
                                        {section.options.map((option, optionIdx) => (
                                            <div key={option.value} className="flex items-center">
                                                <input
                                                    id={`filter-${section.id}-${optionIdx}`}
                                                    name={`${section.id}`}
                                                    defaultValue={option.value}
                                                    type={section.type}
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    onChange={(e) => {
                                                        HandleFilterSelection(e.target.checked, section.name, option.value)
                                                    }}
                                                />
                                                <label
                                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                                    className="ml-3 text-sm text-gray-600"
                                                >
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>
                ))
            }
        </div>
    )
})

const SortMenu = memo(function ({ setMobileFiltersOpen }) {

    const { HandleSortSelection } = useFilter()

    console.log('hi sort');

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const sortOptions = [
        { name: 'Best Rating', sort: 'rating', order: '-1' },
        { name: 'Price: Low to High', sort: 'price', order: '1' },
        { name: 'Price: High to Low', sort: 'price', order: '-1' },
    ]

    return (
        <div className="flex items-center">
            {/* sort menu */}
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                        />
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
                    <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            {sortOptions.map((option) => (
                                <MenuItem key={option.name}>
                                    {({ active }) => (
                                        <div
                                            className={classNames(
                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm'
                                            )}
                                            onClick={() => HandleSortSelection(option.sort, option.order)}
                                        >
                                            {option.name}
                                        </div>
                                    )}
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Transition>
            </Menu>
            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* mobile filter toggler */}
            <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
            >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
        </div>
    )
})

export {
    MobileFilter,
    Filter,
    SortMenu
}
