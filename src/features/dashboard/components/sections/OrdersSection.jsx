import React, { memo } from 'react'
import { Link } from 'react-router-dom';

const OrdersSection = memo(function OrdersSection({ recentOrders }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-3">Orders</h2>
            <Link to='/orders/all' className='text-blue-500 text-sm'>Show More</Link>
            <div className="space-y-4">
                {/* Order Card Example */}
                {
                    recentOrders.map(({ customer_name, deliveryStatus, totalAmount, noOfProducts, createdAt, _id }) => (
                        <div key={_id} className="p-2 sm:p-4 bg-gray-100 rounded-lg shadow">
                            {
                                [
                                    {
                                        name: 'total amount',
                                        child: '₹'+totalAmount
                                    },
                                    {
                                        name: 'no of products',
                                        child: noOfProducts
                                    },
                                    {
                                        name: 'status',
                                        child: deliveryStatus
                                    },
                                    {
                                        name: 'cutomer name',
                                        child: customer_name
                                    },
                                    {
                                        name: 'placed at',
                                        child: new Date(createdAt).toDateString()
                                    },
                                ].map(({ name, child }) => (
                                    <p key={name} className="text-md max-sm:text-xs  capitalize">
                                        <span className='font-semibold mr-1 '>
                                            {name}:
                                        </span>
                                        {child}
                                    </p>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
})

export default OrdersSection
