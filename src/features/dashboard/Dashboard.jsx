import React from 'react';
import { useFetchDashboardQuery } from './dashboardSlice';
import { Container } from '../../components/index'
import SideBar from './components/SideBar';
import StatsSection from './components/sections/StatsSection';
import OrdersSection from './components/sections/OrdersSection';
import ChartSection from './components/sections/ChartSection';

const AdminDashboard = () => {

    const { data: { totalProducts, totalSells, monthlySellsData, totalSellers, recentOrders, soldToday } = {}, isLoading: isLoadingDashBoard } = useFetchDashboardQuery()

    console.log(monthlySellsData)

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Monthly Revenue',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    return (
        <Container
            LoadingConditions={[!!isLoadingDashBoard]}
            // 
            RenderingConditions={[!isNaN(totalProducts), !isNaN(totalSells), !isNaN(totalSellers), !!(monthlySellsData), !!(recentOrders)]}
        >
            <div className="flex">
                <SideBar />
                {/* Main Content */}
                <div className="flex-grow p-8">
                    <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
                    {/* Revenue Chart */}
                    <ChartSection data={data} />
                    {/* Number Sections */}
                    <StatsSection totalProducts={totalProducts} totalSells={totalSells} totalSellers={totalSellers} soldToday={soldToday} />
                    {/* Orders Section */}
                    <OrdersSection recentOrders={recentOrders} />
                </div>
            </div>
        </Container>
    );
};

export default AdminDashboard;