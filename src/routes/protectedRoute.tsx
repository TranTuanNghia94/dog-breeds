import { Navigate } from 'react-router-dom'
import { AuthProviderProps } from '../contexts/Auth/interface';
import { useAuth } from '../contexts/Auth/AuthContext';

export const ProtectedRoute = ({ children }: AuthProviderProps) : JSX.Element => {

    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}