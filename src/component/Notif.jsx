// ProductAddedNotification.js
import React, { useContext } from 'react';
import { NotfyContext } from '../context/Notfy';

const ProductAddedNotification = () => {
    const { notification } = useContext(NotfyContext);

    return (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden animate-fade-in-up">
                <div className="flex items-start p-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-green-700"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductAddedNotification;