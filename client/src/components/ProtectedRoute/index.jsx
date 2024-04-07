import React from 'react';
import { isCookieTokenValid } from '../../api';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ path, component: Component }) => {
    if ((path === '/login' || path === '/signup') && isCookieTokenValid()) return <Navigate to={'/'} />
    else if ((path === '/login' || path === '/signup') && !isCookieTokenValid()) return <Component />
    else if ((path !== '/login' || path !== '/signup') && !isCookieTokenValid()) return <Navigate to={'/login'} />
    else if ((path !== '/login' || path !== '/signup') && isCookieTokenValid()) return <Component />
}

export default ProtectedRoute;