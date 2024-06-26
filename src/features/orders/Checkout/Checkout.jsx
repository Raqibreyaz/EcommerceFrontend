import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Cart from '../../cart/Cart'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import AddressForm from './AddressForm'
import PaymentMethods from './PaymentMethods';
import ExistingAddresses from './ExistingAddresses';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import { fetchUserCartAsync } from '../../cart/cartSlice';
import { createOrderAsync } from '../orderSlice';
import { FailedMessage, SuccessMessage } from '../../../components/MessageDialog';
import { clearError,clearSuccess } from '../orderSlice';

export default function Checkout() {

    const user = useSelector(state => state.user.userData)
    console.log(user);

    let userCart = useSelector(state => state.cart.userCart)
    console.log(userCart);

    const error = useSelector(state => state.order.error)
    const success = useSelector(state => state.order.success)

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        data.deliveryAddress = JSON.parse(data.deliveryAddress)
        data.totalPrice = 0
        data.totalDiscount = 0
        data.totalAmount = 0

        // calculating the total price and discount
        userCart.forEach(product => {
            data.totalPrice += product.price
            data.totalDiscount += product.price * product.discount / 100
        });

        data.totalAmount = data.totalPrice - data.totalDiscount

        data.products = userCart.map(({ product, product_name, quantity, size, color, price, discount, image }) => (
            { product, discount, image, size, color, price, product_name, quantity }
        ))

        delete data.deliveryAddress.name
        delete data.deliveryAddress.id

        console.log(data);

        dispatch(createOrderAsync(data))
    }

    const methods = useForm()

    const { handleSubmit, control } = methods

    if (error) {
        FailedMessage(error)
            .then(() => dispatch(clearError()))
    }

    if (success) {
        SuccessMessage(success)
            .then(()=>dispatch(clearSuccess()))
    }

    useEffect(() => {
        dispatch(fetchUserCartAsync())
    }, [])


    return (
        <div className='my-10'>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-5 border-b ' >
                    <div className="">
                        <AddressForm />
                        <ExistingAddresses addresses={user.addresses} user={user} control={control} />
                        <PaymentMethods control={control} />
                    </div>
                    <div><Cart inCheckout={true} /></div>
                    <button type='submit' className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 capitalize mt-6">Confirm Order</button>
                </form>
            </FormProvider>
        </div>
    )
}
