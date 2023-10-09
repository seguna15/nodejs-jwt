import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivatePage = () => {

    const [user, setUser] = useState(localStorage.getItem("auth"));
    //if user is not signed it do not allow them visit protected routes.
    return <>{user ? <Outlet /> : <Navigate to="/signin" />}</>;
}

export default PrivatePage