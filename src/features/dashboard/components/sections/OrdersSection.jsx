import React, { memo } from 'react'

const OrdersSection = memo(function OrdersSection() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Orders</h2>
            <Link to='/orders/all'></Link>
            <div className="space-y-4">
                {/* Order Card Example */}
                <div className="p-4 bg-gray-100 rounded-lg shadow">
                    <p className="text-md font-semibold">Customer Name: John Doe</p>
                    <p className="text-md">Product Owner: Jane Smith</p>
                    <p className="text-md">Amount: $100</p>
                    <p className="text-md">State: Pending</p>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg shadow">
                    <p className="text-md font-semibold">Customer Name: Alice Brown</p>
                    <p className="text-md">Product Owner: Bob Johnson</p>
                    <p className="text-md">Amount: $250</p>
                    <p className="text-md">State: Delivered</p>
                </div>
            </div>
        </div>
    )
})

export default OrdersSection
