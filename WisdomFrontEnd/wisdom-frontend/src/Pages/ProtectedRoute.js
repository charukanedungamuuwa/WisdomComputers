import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, role } = useAuth();

    // Debugging: Log role and allowedRoles
    console.log('Current Role:', role);
    console.log('Allowed Roles:', allowedRoles);

    if (!isAuthenticated) {
        console.log('Not authenticated. Redirecting to login.');
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(role)) {
        console.log('Role not authorized. Redirecting to unauthorized page.');
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
