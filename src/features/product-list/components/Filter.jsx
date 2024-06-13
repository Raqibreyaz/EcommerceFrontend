import React, { useEffect, useState } from 'react'
import { Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { fetchCategoriesAsync } from '../ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Filter({ productOwners, px = '' }) {

    // {color:['red','blue'],rating:['4.3','4.6']}
    const [filter, setFilter] = useState({})

    const dispatch = useDispatch()

    function handleChange(e, field, value) {

        let newFilter = { ...filter }
        if (e.target.checked) {
            (newFilter[field] ??= []).push(value)
            // newFilter[field].push(value)
        }
        else {
            newFilter[field] = newFilter[field].filter((val) => (val !== value))
        }
        console.log(newFilter);
        setFilter(newFilter)
    }

    useEffect(() => {
        console.log('going to take categories');
        dispatch(fetchCategoriesAsync())
    }
        , [])

    let categories = useSelector(state => state.product.categories)

    console.log(categories);

    return (
        <div>
            {
                [
                    {
                        id: 'category',
                        name: 'category',
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
                        name: "pricing",
                        options: [
                            "100 to 1k",
                            "1k to 5k",
                            "5k to 10k",
                            "10k or above"
                        ].map((priceRange) => (
                            { value: priceRange, label: priceRange, checked: false }
                        ))
                    },
                    {
                        id: "discount",
                        name: "discount",
                        options: [
                            "at least 10%",
                            "at least 20%",
                            "at least 30%",
                            "at least 40%"
                        ].map((discount) => (
                            { value: discount, label: discount, checked: false }
                        ))
                    },
                    {
                        id: "product owners",
                        name: "product owners",
                        options: productOwners.map((brand) => (
                            { value: brand.toLowerCase(), label: brand, checked: false }
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
                                                    name={`${section.id}[]`}
                                                    defaultChecked={option.checked}
                                                    defaultValue={option.value}
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                    onChange={(e) => handleChange(e, section.name, option.value)}
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
}

export default Filter
