import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const SideBar = memo(function SideBar() {
    return (
        < div className="w-64 bg-gray-800 h-screen sticky top-16 flex flex-col justify-between" >
            <div className="p-4 text-white">
                <h2 className="text-lg font-semibold mb-4">Actions</h2>
                <ul className="space-y-2">
                    {[
                        {
                            to: "/change-user-role",
                            child: 'change user role'
                        },
                        {
                            to: "/messages",
                            child: 'messages',
                        },
                        {
                            to: '/return-requests',
                            child: 'return requests'
                        }
                    ].map(({ to, child }) => (
                        <li key={to}>
                            <Link to={to} className="text-blue-500 capitalize hover:text-blue-200">
                                {child}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    )
})

export default SideBar
