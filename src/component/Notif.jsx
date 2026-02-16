// ProductAddedNotification.js
import React, { useContext } from 'react';
import { NotfyContext } from '../context/Notfy';
import { BadgeCheckIcon, Ban } from 'lucide-react';

const ProductAddedNotification = () => {
    const { notification } = useContext(NotfyContext);
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

    if (!notification) return null;

    return (
        <div className={`fixed md:top-4 md:left-4 sm:bottom-4 sm:right-4 z-100 max-w-60 w-full ${isFadingOut ? 'animate-fade-out' : 'animate-fade-in'}`}>
            <div className="bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden animate-fade-in-up">
                <div className="flex items-start p-4">
                    {/* Icon */}
                    <div className="shrink-0">
                        <div className={`w-8 h-8 rounded-full bg-green-100 flex items-center justify-center ${notification.type === 'error' ? 'bg-red-100' : ''}`}>
                            {notification.type === 'success' &&
                                <BadgeCheckIcon className="h-5 w-5 text-green-700" />}

                            {notification.type === 'error' &&
                                <Ban className="h-5 w-5 text-red-700" />}
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