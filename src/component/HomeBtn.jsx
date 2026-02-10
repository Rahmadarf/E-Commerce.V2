// LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import Tooltip from '@mui/material/Tooltip';
import { Home } from 'lucide-react';

const HomeButton = () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    return (
        <Tooltip title="Home" placement="bottom" arrow>
            <button
                onClick={() => navigate('/')}
                className="fixed bottom-4 right-4 xl:top-4 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-blue-200 text-gray-700 hover:bg-blue-50 hover:text-blue-700 shadow-sm transition-all duration-200 group"
                aria-label="Home"
            >
                <Home
                    className="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
                />
            </button>
        </Tooltip>

    );
};

export default HomeButton;