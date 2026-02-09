import { useUser } from "@clerk/clerk-react";

function AdminHeader() {

    const { user } = useUser();

    const initials = 
        (user?.firstName.charAt(0) || '') +
        (user?.lastName.charAt(0) || '');

    return (
        <header className="bg-white shadow-sm border-b border-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <h1 className="text-2xl font-bold text-blue-800">Admin Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">{user?.fullName}</span>
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-800 font-medium">{initials}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            
    );
}

export default AdminHeader;