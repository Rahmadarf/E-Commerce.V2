// LoginRequiredNotification.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginRequiredNotification = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-sm border border-blue-100 max-w-md w-full overflow-hidden">
                <div className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-blue-700"
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

                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Membutuhkan Autentikasi
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Kamu perlu log in untuk mengakses halaman ini.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/login"
                            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/signup"
                            className="px-5 py-2.5 bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                        >
                            Buat akun
                        </Link>
                    </div>
                </div>

                <div className="bg-blue-50 px-6 py-3 text-center">
                    <p className="text-xs text-blue-800">
                        Autentikasi aman • Data Anda terlindungi
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginRequiredNotification;