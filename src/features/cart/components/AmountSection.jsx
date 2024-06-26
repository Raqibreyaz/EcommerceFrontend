import React from 'react'
import { Link } from 'react-router-dom'

export function AmountSection({ subTotal, totalDiscount, inCheckout }) {

    return (
        <div className="border-t border-gray-200 py-6 sm:px-6 w-full">
            <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>{subTotal}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
                <p className='capitalize'>total discount</p>
                <p>{totalDiscount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 border-t  mt-2">
                <p className='capitalize'>grand total</p>
                <p>{subTotal - totalDiscount}</p>
            </div>
            {!inCheckout && <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>}
            {
                !inCheckout && <Link
                    to='/checkout'
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 capitalize mt-6"
                >
                    checkout
                </Link>
            }
            {!inCheckout && < div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                    or{' '}
                    <Link
                        to='/'
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                    </Link>
                </p>
            </div>}
        </div>
    )
}

export default AmountSection
