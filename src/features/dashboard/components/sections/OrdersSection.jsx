import React, { memo } from 'react'
import { Link } from 'react-router-dom';

const OrdersSection = memo(function OrdersSection({ recentOrders }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Orders</h2>
            <Link to='/orders/all' className='text-blue-500 text-sm'>Show More</Link>
            <div className="space-y-4">
                {/* Order Card Example */}
                {
                    recentOrders.map(({ customer_name, deliveryStatus, totalAmount, noOfProducts, createdAt, _id }) => (
                        <div key={_id} className="p-4 bg-gray-100 rounded-lg shadow">
                            <p className="text-md font-semibold">Customer Name: {customer_name}</p>
                            <p className="text-md">Total Amount: {totalAmount}</p>
                            <p className="text-md">No Of Products: {noOfProducts}</p>
                            <p className="text-md">status: {deliveryStatus}</p>
                            <p className="text-md">placed at: {createdAt}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
})

export default OrdersSection
