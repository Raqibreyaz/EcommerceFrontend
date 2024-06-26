import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Cart from '../features/cart/Cart'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import AddressForm from './AddressForm'
import PaymentMethods from './PaymentMethods';
import ExistingAddresses from './ExistingAdresses';
import { useForm, Controller } from 'react-hook-form';

export default function Checkout() {

    const user = useSelector(state => state.user.userData)
    console.log(user);

    const userCart = useSelector(state => state.user.userCart)

    const people = user.addresses.map(({ state, city, pincode, house_no }) => (
        {
            name: user.fullname,
            street: house_no,
            pinCode: pincode,
            city,
            state,
            id: Date.now()
        }
    ))

    const onSubmit = (data) => {
        console.log(data);
    }


    const { handleSubmit, control, setValue, register } = useForm()

    return (
        <div className='my-10'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-5 border-b ' >
                <div className="">
                    <AddressForm />
                    <ExistingAddresses people={people} />
                    <PaymentMethods />
                </div>
                <div><Cart inCheckout={true} /></div>
                <button type='submit' className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 capitalize mt-6">Confirm Order</button>
            </form>
        </div>
    )
}
