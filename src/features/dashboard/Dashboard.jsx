import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 h-screen sticky top-0 flex flex-col justify-between">
                <div className="p-4 text-white">
                    <h2 className="text-lg font-semibold mb-4">Actions</h2>
                    <ul className="space-y-2">
                        <li><Link to="/add-seller" className="text-blue-400 hover:text-blue-200">Add Seller</Link></li>
                        <li><Link to="/add-admin" className="text-blue-400 hover:text-blue-200">Add Admin</Link></li>
                        <li><Link to="/messages" className="text-blue-400 hover:text-blue-200">Messages</Link></li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-8">
                <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

                {/* Number Sections */}
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
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-2">Total Sellers</h2>
                        <p className="text-3xl font-semibold text-gray-800">50</p>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-semibold mb-4">Orders</h2>
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

                {/* Revenue Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-lg font-semibold mb-4">Revenue Chart</h2>
                    {/* Display revenue chart here */}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
