import React from 'react';
import { Navigate } from 'react-router-dom';
import useSessionValidation from '../../utils/SessionValidator';

const ProtectedRoute = ({ path, component: Component }) => {
    const isSessionValid = useSessionValidation();

    if (isSessionValid() && (path === '/login' || path === '/signup')) return <Navigate to={'/'} />
    else if (!isSessionValid() && (path === '/login' || path === '/signup')) return <Component />
    else if (!isSessionValid() && (path !== '/login' || path !== '/signup')) return <Navigate to={'/login'} />
    else if (isSessionValid() && (path !== '/login' || path !== '/signup')) return <Component />
}

export default ProtectedRoute;