import React, { memo } from 'react'

const StatsSection = memo(function StatsSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Total Products</h2>
                <p className="text-3xl font-semibold text-gray-800">1000</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
                <p className="text-3xl font-semibold text-gray-800">500</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Sold Today</h2>
                <p className="text-3xl font-semibold text-gray-800">20</p>
            </div>
            <Link to='/sellers' className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Total Sellers</h2>
                <p className="text-3xl font-semibold text-gray-800">50</p>
            </Link>
        </div>

    )
})

export default StatsSection
