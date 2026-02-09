import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const Navbar = () => {

    const [Opened, Open] = useState(false);
    const { user, isLoaded } = useUser();


    const initials =
        (user?.firstName?.charAt(0) || '') +
        (user?.lastName?.charAt(0) || '');

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    { user && <div className="flex items-center">
                        <div className="shrink-0 flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-800 font-bold text-lg">
                                    {initials}
                                </span>
                            </div>
                            <span className="ml-2 text-xl font-bold text-gray-900">{user?.fullName} </span>
                        </div>
                    </div>}

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {['Home', 'Products', 'Categories', 'Deals', 'About'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className="text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <Tooltip title="Search" arrow>
                            <button className="text-gray-600 hover:text-blue-700 p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </Tooltip>


                        {/* Account */}
                        <Tooltip title="Account" arrow>
                            <Link to="/account" className="text-gray-600 hover:text-blue-700 p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </Link>
                        </Tooltip>

                        {/* Cart */}
                        <Tooltip title="Cart" arrow>
                            <Link to="/cart" className="relative text-gray-600 hover:text-blue-700 p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    3
                                </span>
                            </Link>
                        </Tooltip>

                        {/* Mobile Menu Button */}
                        <button onClick={() => Open(!Opened)} className="md:hidden text-gray-600 hover:text-blue-700 p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu (Hidden by default) */}
            <div className={"md:hidden absolute w-full bg-white border-t transition-transform duration-300 border-blue-100 py-4 px-4 " + (Opened ? " " : "hidden")}>
                <div className="space-y-3">
                    {['Home', 'Products', 'Categories', 'Deals', 'About'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                            className="block py-2 text-gray-700 hover:text-blue-700 font-medium"
                            onClick={() => Open(!Opened)}
                        >
                            {item}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Navbar;