import React, { memo } from 'react'

const SideBar = memo(function SideBar() {
    return (
        < div className="w-64 bg-gray-800 h-screen sticky top-0 flex flex-col justify-between" >
            <div className="p-4 text-white">
                <h2 className="text-lg font-semibold mb-4">Actions</h2>
                <ul className="space-y-2">
                    <li><Link to="/add-seller" className="text-blue-400 hover:text-blue-200">Add Seller</Link></li>
                    <li><Link to="/add-admin" className="text-blue-400 hover:text-blue-200">Add Admin</Link></li>
                    <li><Link to="/messages" className="text-blue-400 hover:text-blue-200">Messages</Link></li>
                    <li><Link to="/return-requests" className="text-blue-400 hover:text-blue-200">return requests</Link></li>
                </ul>
            </div>
        </div >
    )
})

export default SideBar
