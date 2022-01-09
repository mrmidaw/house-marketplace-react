import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/react";

export const PrivateRoute = () => {

    const override = css`
          
          display: block;          
          margin: 100px 100px;
          border-color: red;
    `;

    const { loggedIn, checkingStatus } = useAuthStatus();

    if (checkingStatus) {
        return <PulseLoader css={override} size={24} margin={12} />
    }

    return loggedIn ? <Outlet /> : <Navigate to='/sing-in' />
};
