import React, { useState } from 'react'
import { Disclosure, DisclosurePanel, DisclosureButton } from '@headlessui/react'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { filterProductsAsync } from '../ProductSlice';
import { useDispatch } from 'react-redux';

function Filter({px = '' }) {

    const filters = [
        {
            id: 'color',
            name: 'color',
            options: [
                { value: 'white', label: 'White', checked: false },
                { value: 'beige', label: 'Beige', checked: false },
                { value: 'blue', label: 'Blue', checked: false },
                { value: 'brown', label: 'Brown', checked: false },
                { value: 'green', label: 'Green', checked: false },
                { value: 'purple', label: 'Purple', checked: false },
            ],
        },
        {
            id: 'category',
            name: 'category',
            options: [
                { value: 'new-arrivals', label: 'New Arrivals', checked: false },
                { value: 'sale', label: 'Sale', checked: false },
                { value: 'travel', label: 'Travel', checked: false },
                { value: 'organization', label: 'Organization', checked: false },
                { value: 'accessories', label: 'Accessories', checked: false },
            ],
            options: [
                { value: 'clothing', label: 'Clothing', checked: false },
                { value: 'electronics', label: 'Electronics', checked: false },
                { value: 'accessories', label: 'Accessories', checked: false },
                { value: 'footwear', label: 'Footwear', checked: false }],
        },
        {
            id: 'size',
            name: 'size',
            options: [
                { value: '2l', label: '2L', checked: false },
                { value: '6l', label: '6L', checked: false },
                { value: '12l', label: '12L', checked: false },
                { value: '18l', label: '18L', checked: false },
                { value: '20l', label: '20L', checked: false },
                { value: '40l', label: '40L', checked: false },
            ],
        },
        {
            id: "brands",
            name: "brands",
            options: [
                'Nike', 'Apple', 'Tommy Hilfiger', 'Adidas', 'Casio', 'Ralph Lauren', 'Samsung',
                'Fossil', 'Under Armour', 'Sony', 'Logitech', 'Herschel Supply Co.', 'Levi\'s',
                'Ring', 'Dr. Martens', 'Wrangler', 'JBL', 'Calvin Klein', 'Merrell', 'Lacoste',
                'Seagate', 'Ray-Ban', 'Razer', 'Michael Kors', 'Steve Madden'
            ].map((brand) => (
                { value: brand.toLowerCase(), label: brand, checked: false }
            ))
        }
    ]

    // {color:'red',rating:'4.3'}
    const [filter, setFilter] = useState({})

    // const [checked, setChecked] = useState(false)

    const dispatch = useDispatch()

    function handleChange(field, value) {
        // let newChecked = !checked
        let newFilter;

        // if (newChecked) {
        newFilter = { ...filter, [field]: value }
        // }
        // else {
        //     const { [field]: deletedValue, ...remainingFields } = newFilter = remainingFields
        // }

        console.log(newFilter);
        dispatch(filterProductsAsync(newFilter))
        // setChecked(!checked)
        setFilter(newFilter)
    }

    return (
        <div>
            {
                filters.map((section) => (
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
                                                    onChange={(e) => handleChange(section.name, option.value)}
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
