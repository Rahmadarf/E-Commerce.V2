// LoginRequiredCartNotify.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRequiredCartNotify = ({ isVisible, onClose }) => {
    const navigate = useNavigate();
    const [isFadingOut, setFadingOut] = useState(false)

    // Handle auto-dismiss and fade-out
    useEffect(() => {
        let timer;
        if (isVisible) {
            // Reset fade-out state
            setFadingOut(false);

            // Set auto-dismiss timer
            timer = setTimeout(() => {
                setFadingOut(true);
            }, 6000);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isVisible]);

    // Handle cleanup after fade-out completes
    useEffect(() => {
        if (isFadingOut) {
            const fadeTimer = setTimeout(() => {
                onClose();
            }, 300);
            return () => clearTimeout(fadeTimer);
        }
    }, [isFadingOut, onClose]);

    const handleLoginClick = () => {
        navigate('/login');
        onClose();
    };

    const handleDismiss = () => {
        setFadingOut(true)
    }

    if (!isVisible && !isFadingOut) return null;

    return (
        <div className={`fixed bottom-6 right-6 z-50 animate-fade-in ${isFadingOut ? 'animate-fade-out' : 'animate-fade-in'
            }`}>
            <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-5 max-w-sm w-full">
                <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 text-blue-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                            Diperlukan Login
                        </h3>
                        <p className="text-gray-700 mb-4">
                            Silakan login untuk menambahkan barang ke keranjang belanja Anda dan menyelesaikan pembelian.
                        </p>

                        <div className="flex space-x-3">
                            <button
                                onClick={handleLoginClick}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                Pergi Login
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                Abaikan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginRequiredCartNotify;