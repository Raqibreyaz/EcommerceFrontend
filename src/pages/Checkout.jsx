import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Cart from '../features/cart/Cart'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import AddressForm from '../components/AddressForm'

export default function Checkout() {

    const user = useSelector(state => state.user.userData)
    console.log(user);

    const people = user.addresses.map(({ state, city, pincode, house_no }) => (
        {
            name: user.fullname,
            street: house_no,
            pinCode: pincode,
            city,
            state
        }
    ))

    const [addressAdder, setAddressAdder] = useState(false)

    // [
    //     {
    //         name: 'Leslie Alexander',
    //         street: '11th main',
    //         pinCode: '678611',
    //         state: 'lsudpopa',
    //         city: 'new york'
    //     },
    // ]

    return (
        <div className='my-10'>
            <form className='bg-white px-10 py-2 border-b'>
                <div className="my-12">
                    {
                        addressAdder && <AddressForm />
                    }
                    <div className='text-end capitalize'>
                        <input type="checkbox" id='address' onChange={(e) => setAddressAdder(e.target.checked)} />
                        <label htmlFor="address" className='ml-1 font-semibold'>
                            want to Add New Address?
                        </label>
                    </div>
                    <div>
                        <h1 className='text-lg font-semibold'>Address</h1>
                        <p className='font-thin text-gray-500'>choose from existing addresses</p>
                        <ul role="list" className="divide-y divide-gray-100">
                            {people.map((person) => (
                                <li key={person.email} className="flex justify-between gap-x-6 py-5">
                                    <div className="flex min-w-0 gap-x-4 items-start">
                                        <input type="radio" name='address' />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.street}</p>
                                            <div className='text-gray-400 text-xs'>{person.pinCode}</div>
                                        </div>
                                    </div>
                                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                        <div className="mt-1 flex flex-col gap-x-1.5 text-gray-500">
                                            <div className='font-semibold text-md'>{person.state}</div>
                                            <div className='font-semibold text-sm'>{person.city}</div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h1 className='text-lg capitalize font-semibold '>payment methods</h1>
                        <p className='text-gray-500'>choose one</p>
                        <div className='font-semibold text-sm mt-5 flex flex-col gap-3'>
                            <div className='flex gap-1 capitalize'>
                                <input type="radio" name='payment' id='cash' />
                                <label htmlFor="cash">cash</label>
                            </div>
                            <div className='flex gap-1 capitalize'>
                                <input type="radio" name='payment' id='credit card' />
                                <label htmlFor="credit card">credit card</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div><Cart btnText='Place Order' btnLink='/payment' /></div>
            </form>
        </div>
    )
}
