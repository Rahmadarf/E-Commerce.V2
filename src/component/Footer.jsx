import { useUser } from "@clerk/clerk-react";

function Footer() {
    const { user, isLoaded } = useUser();

    if (!isLoaded) return null;

    const initials =
        (user?.firstName?.charAt(0)?.toUpperCase() || '') +
        (user?.lastName?.charAt(0)?.toUpperCase() || '');

    return (
        <footer className="bg-white border-t border-blue-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        { user && <div className="flex items-center mb-4">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-800 font-bold">{initials}</span>
                            </div>
                            <span className="ml-2 text-xl font-bold text-gray-900">{user?.fullName || 'Guest'}</span>
                        </div>}
                        <p className="text-gray-600">
                            Your one-stop shop for all tech accessories and gadgets.
                        </p>
                    </div>

                    {['Products', 'Customer Service', 'Company'].map((section) => (
                        <div key={section}>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">{section}</h3>
                            <ul className="space-y-2">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <li key={i}>
                                        <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors">
                                            {section} Link {i + 1}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-blue-100 mt-12 pt-8 text-center text-gray-600">
                    <p>© 2026 Rahmad Arifin. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;