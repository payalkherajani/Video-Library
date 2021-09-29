import React from 'react';
import { Route, Navigate } from 'react-router-dom';


const PrivateRoute = ({ path, ...props }) => {
    return (
        localStorage.getItem('token') ? (<Route {...props} path={path} />) : (
            <Navigate to="/login" />
        )
    )
}

export default PrivateRoute;