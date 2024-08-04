import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const StatsSection = memo(function StatsSection({ totalProducts, totalSells, soldToday, totalSellers }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6 tracking-tight leading-tight">
            {
                [
                    {
                        name: 'total products',
                        child: totalProducts
                    },
                    {
                        name: 'total sells',
                        child: totalSells
                    },
                    {
                        name: 'sold today',
                        child: soldToday
                    },
                ].map(({ name, child }) => (
                    <div key={name} className="bg-white p-3 sm:p-4 rounded-lg shadow-md capitalize">
                        <h2 className="text-lg max-sm:text-md font-semibold mb-2">{name}</h2>
                        <p className="text-3xl max-sm:text-xl font-semibold text-gray-800">{child}</p>
                    </div>
                ))
            }
            <Link to='/sellers' className="bg-white p-3  sm:p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">Total Sellers</h2>
                <p className="text-3xl max-sm:text-xl font-semibold text-gray-800">{totalSellers}</p>
            </Link>
        </div>

    )
})

export default StatsSection
