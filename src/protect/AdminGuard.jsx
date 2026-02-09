import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import { ShieldOffIcon } from "lucide-react"

const AdminGuard = ({ children }) => {
    const { user, isLoaded } = useUser();

    if (!isLoaded) return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-6"></div>
            <h2 className="text-xl font-medium">Tunggu Sebentar...</h2>
            <p className="text-gray-600">Memuat Halaman Admin</p>
        </div>
    );

    if (user?.publicMetadata?.role !== "admin") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-sm border border-blue-100 max-w-md w-full overflow-hidden">
                    <div className="p-6 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShieldOffIcon className="h-8 w-8 text-blue-700" />
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            Halaman Tidak Tersedia
                        </h2>

                        <p className="text-gray-600 mb-6">
                            Anda tidak memiliki izin untuk mengakses halaman ini.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/"
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                Kembali ke Beranda
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
        )
    }

    return children;
};

export default AdminGuard;
