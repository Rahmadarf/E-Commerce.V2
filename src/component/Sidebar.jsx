import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-64 bg-white border-r border-blue-100 h-screen flex flex-col">
            {/* Logo/Header */}
            <div className="p-5 border-b border-blue-100">
                <h1 className="text-xl font-bold text-blue-800">E-Commerce</h1>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 py-4">
                <ul className="space-y-1 px-3">
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                            <div className="w-5 h-5 bg-blue-200 rounded mr-3"></div>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                            <div className="w-5 h-5 bg-blue-200 rounded mr-3"></div>
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                        >
                            <div className="w-5 h-5 bg-blue-200 rounded mr-3"></div>
                            <span>Home</span>
                        </a>
                    </li>
                </ul>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-blue-100">
                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-800 font-medium">U</span>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">User Name</p>
                        <p className="text-xs text-gray-500">user@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;