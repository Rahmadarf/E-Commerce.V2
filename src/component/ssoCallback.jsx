import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SsoCallback = () => {
    const { isLoaded, isSignedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoaded) return;

        if (isSignedIn) {
            navigate('/', { replace: true });
        }
    }, [isLoaded, isSignedIn]);

    return <div>Signing you in...</div>;
};

export default SsoCallback;
