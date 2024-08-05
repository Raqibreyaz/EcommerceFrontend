import React, { useMemo, useState } from 'react';
import { useFetchDashboardQuery } from './dashboardSlice';
import { Container } from '../../components/index'
import SideBar from './components/SideBar';
import StatsSection from './components/sections/StatsSection';
import OrdersSection from './components/sections/OrdersSection';
import ChartSection from './components/sections/ChartSection';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/solid';
import SlidingWrapper from '../../components/SlidingWrapper';

const AdminDashboard = () => {

    let { data: { totalProducts, totalSells, monthlySellsData = [], totalSellers, recentOrders, soldToday } = {}, isLoading: isLoadingDashBoard } = useFetchDashboardQuery()
    const [isSideBarOpen, setSideBarOpen] = useState(false)
    const data = useMemo(() => ({
        labels: Array.from({ length: (new Date().getDate()) }, (element, index) => index + 1),
        datasets: [
            {
                label: 'Monthly Revenue',
                data:Array.from({ length: (new Date()).getDate() }, (element, index) => {
                    if (monthlySellsData.length > 0 && monthlySellsData[0]._id === index + 1) {
                        const sell = monthlySellsData[0].totalSells
                        monthlySellsData = monthlySellsData.filter((_, index) => (index !== 0))
                        return sell
                    }
                    return 0
                }),
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    }), [monthlySellsData])

    return (
        <Container
            LoadingConditions={[!!isLoadingDashBoard]}
            RenderingConditions={[!isNaN(totalProducts), !isNaN(totalSells), !isNaN(totalSellers), !!(monthlySellsData), !!(recentOrders)]}
            className='w-full'
        >
            <h1 className="text-3xl max-sm:text-2xl italic font-semibold mb-3 max-sm:p-4 md:-mt-3">Admin Dashboard</h1>
            <div>

                <button
                    className='md:hidden max-sm:ml-4 max-sm:-mt-4'
                    type='button'
                    onClick={(e) => setSideBarOpen(true)}
                >
                    <EllipsisHorizontalCircleIcon className='size-8 text-blue-500' />
                </button>
            </div>
            <div className="flex w-full">
                <div className='max-md:hidden'>
                    <SideBar />
                </div>
                <SlidingWrapper isOpen={isSideBarOpen} setIsOpen={setSideBarOpen}>
                    <SideBar />
                </SlidingWrapper>
                {/* Main Content */}
                <div className="flex-grow p-4">
                    {/* Revenue Chart */}
                    <ChartSection data={data} />
                    {/* Number Sections */}
                    <StatsSection totalProducts={totalProducts} totalSells={totalSells} totalSellers={totalSellers} soldToday={soldToday} />
                    {/* Orders Section */}
                    <OrdersSection recentOrders={recentOrders} />
                </div>
            </div>
        </Container >
    );
};

export default AdminDashboard;