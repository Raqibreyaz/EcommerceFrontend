import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const StatsSection = memo(function StatsSection({ totalProducts, totalSells, soldToday, totalSellers }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Total Products</h2>
                <p className="text-3xl font-semibold text-gray-800">{totalProducts}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
                <p className="text-3xl font-semibold text-gray-800">{totalSells}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Sold Today</h2>
                <p className="text-3xl font-semibold text-gray-800">{soldToday}</p>
            </div>
            <Link to='/sellers' className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Total Sellers</h2>
                <p className="text-3xl font-semibold text-gray-800">{totalSellers}</p>
            </Link>
        </div>

    )
})

export default StatsSection
