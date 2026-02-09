// LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Tooltip from '@mui/material/Tooltip';

const HomeButton = () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    return (
        <Tooltip title="Home" placement="bottom" arrow>
            <button
                onClick={() => navigate('/')}
                className="fixed top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-blue-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 shadow-sm transition-all duration-200 group"
                aria-label="Home"
            >
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="2" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                class="lucide lucide-house-icon lucide-house w-5 h-5 transition-transform duration-200 group-hover:-rotate-12">
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
            </button>
        </Tooltip>

    );
};

export default HomeButton;