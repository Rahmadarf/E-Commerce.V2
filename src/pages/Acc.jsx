// AccountSettings.js
import { useUser, useClerk } from '@clerk/clerk-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginRequiredNotification from '../component/Notify';
import LogoutAlert from '../component/LogOutAlert';

const Account = () => {
    const { user, isLoaded } = useUser();
    const signOut = useClerk();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showLogoutAlert, setShowLogoutAlert] = useState(false);

    // Initialize form data when user loads
    if (isLoaded && !formData.firstName && user) {
        setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.emailAddresses[0]?.emailAddress || ''
        });
    }

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        try {
            await user.update({
                firstName: formData.firstName,
                lastName: formData.lastName
            });

            // Update email if changed
            if (formData.email !== user.emailAddresses[0]?.emailAddress) {
                await user.createEmailAddress({ email: formData.email });
                // Note: User will need to verify new email
            }

            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating profile:', err);
            setMessage({
                type: 'error',
                text: err.errors?.[0]?.message || 'Failed to update profile'
            });
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        try {
            await user.updatePassword({
                newPassword: passwordData.newPassword,
                currentPassword: passwordData.currentPassword
            });

            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            console.error('Error updating password:', err);
            setMessage({
                type: 'error',
                text: err.errors?.[0]?.message || 'Failed to update password'
            });
        }
    };

    const handleLogout = () => {
        signOut.signOut(() => navigate('/login'));
        setShowLogoutAlert(false);
    }



    if (!isLoaded || !user) {
        return (
            <LoginRequiredNotification />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                                    <span className="text-blue-800 text-2xl font-bold">
                                        {(user?.firstName?.charAt(0) || 'U') + (user?.lastName?.charAt(0) || 'U')}
                                    </span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {user?.firstName} {user?.lastName}
                                </h2>
                                <p className="text-gray-600 mt-1">{user?.emailAddresses[0]?.emailAddress}</p>
                                <div className="mt-4 w-full">
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                    >
                                        {isEditing ? 'Cancel' : 'Edit Profile'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Settings Sections */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Settings */}
                        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h2>

                            {message.text && (
                                <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                    }`}>
                                    {message.text}
                                </div>
                            )}

                            {isEditing ? (
                                <form onSubmit={handleProfileUpdate}>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                            <p className="text-xs text-gray-500 mt-1">
                                                Changing your email will require verification
                                            </p>
                                        </div>

                                        <div className="flex gap-3 pt-2">
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                            >
                                                Save Changes
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm text-gray-500">First Name</span>
                                        <p className="font-medium">{user?.firstName || '-'}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Last Name</span>
                                        <p className="font-medium">{user?.lastName || '-'}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500">Email Address</span>
                                        <p className="font-medium">{user?.emailAddresses[0]?.emailAddress || '-'}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Password Settings */}
                        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Change Password</h2>

                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                                >
                                    Update Password
                                </button>
                            </form>
                        </div>

                        {/* Danger Zone */}
                        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Danger Zone</h2>
                            <p className="text-gray-600 mb-4">
                                Log out of your account on this device.
                            </p>
                            <button onClick={() => setShowLogoutAlert(true)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <LogoutAlert isOpen={showLogoutAlert} onConfirm={() => handleLogout()} onCancel={() => setShowLogoutAlert(false)} />

        </div>
    );
};

export default Account;