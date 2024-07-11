import React, { memo } from 'react'
import { Line } from 'react-chartjs-2'

const ChartSection = memo(function ChartSection({data}) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Revenue Chart</h2>
            {/* Display revenue chart here */}
            <Line data={data} />
        </div>
    )
})

export default ChartSection
