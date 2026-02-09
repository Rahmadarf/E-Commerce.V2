import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const AuthLoader = ({ children }) => {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-6"></div>
                <h2 className="text-xl font-medium">Tunggu Sebentar...</h2>
                <p className="text-gray-600">Memuat Halaman Anda</p>
            </div>
        );
    }

    return children;
};

export default AuthLoader;
