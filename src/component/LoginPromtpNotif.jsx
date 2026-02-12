// LoginPromptNotification.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPromptNotification = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 px-4 py-3 flex items-center space-x-3 animate-fade-in">
                <span className="text-gray-700 text-sm">
                    Belum log in ke EzShop?
                </span>
                <button
                    onClick={handleLoginClick}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                >
                    Log in sekarang
                </button>
            </div>
        </div>
    );
};

export default LoginPromptNotification;