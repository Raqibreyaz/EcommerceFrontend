import React from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { useFetchDashboardQuery } from './dashboardSlice';
import { Container } from '../../components/index'
import SideBar from './components/SideBar';
import StatsSection from './components/sections/StatsSection';
import OrdersSection from './components/sections/OrdersSection';
import ChartSection from './components/sections/ChartSection';

const AdminDashboard = () => {

    const { data: { totalProducts, totalSells, monthlySellsData, totalSellers, recentOrders } = {}, isLoading: isLoadingDashBoard } = useFetchDashboardQuery()

    console.log(totalProducts, totalSellers, totalSells, monthlySellsData, recentOrders)

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
            RenderingConditions={[!!totalProducts, !!totalSells, !!totalSellers, !!monthlySellsData, !!recentOrders]}
        >
            <div className="flex">
                <SideBar />
                {/* Main Content */}
                <div className="flex-grow p-8">
                    <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
                    {/* Revenue Chart */}
                    <ChartSection data={data} />
                    {/* Number Sections */}
                    <StatsSection />
                    {/* Orders Section */}
                    <OrdersSection />
                </div>
            </div>
        </Container>
    );
};

export default AdminDashboard;