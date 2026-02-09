// VerifyEmail.js
import { useSignUp } from '@clerk/clerk-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
    const { signUp, isLoaded } = useSignUp();
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;

        setIsLoading(true);
        setError('');

        try {
            const result = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (result.status === 'complete') {
                navigate('/onboarding'); // Redirect after verification
            }
        } catch (err) {
            setError(err.errors[0]?.message || 'Invalid verification code');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isLoaded) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                    Verify your email
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    We sent a verification code to your email
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-blue-100">
                    {error && (
                        <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleVerify}>
                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                Verification code
                            </label>
                            <div className="mt-1">
                                <input
                                    id="code"
                                    name="code"
                                    type="text"
                                    required
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-blue-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter 6-digit code"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading
                                        ? 'bg-blue-400 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                {isLoading ? 'Verifying...' : 'Verify Email'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <button
                            onClick={() => signUp.prepareEmailAddressVerification({ strategy: 'email_code' })}
                            className="text-sm text-blue-700 hover:text-blue-500"
                        >
                            Resend verification code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;