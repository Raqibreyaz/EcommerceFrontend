import React, { memo } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart } from 'chart.js/auto'

const ChartSection = memo(function ChartSection({ data }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Revenue Chart</h2>
            {/* Display revenue chart here */}
            <div className='h-[50vh] lg:w-[65vw] max-lg:w-[55vw] max-md:w-[78vw]'>
                <Line data={data} options={
                    {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                } />
            </div>
        </div>
    )
})

export default ChartSection
