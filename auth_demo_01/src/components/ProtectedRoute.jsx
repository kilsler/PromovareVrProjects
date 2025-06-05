import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children, redirectTo }) {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export default ProtectedRoute;