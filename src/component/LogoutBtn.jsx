// LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Tooltip from '@mui/material/Tooltip';

const LogoutButton = () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <Tooltip title="Log out" placement="bottom" arrow>
            <button
                onClick={handleLogout}
                className="fixed bottom-4 right-4 xl:top-4 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-blue-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 shadow-sm transition-all duration-200 group"
                aria-label="Log out"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 transition-transform duration-200 group-hover:-rotate-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                </svg>
            </button>
        </Tooltip>

    );
};

export default LogoutButton;