import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from './u2-Header/Header';
import {ErrorSnackBar} from './common/c1-components/ErrorSnackBar/ErrorSnackBar';

export const Main = () => {
    return (
        <div>
            <Header/>
            <ErrorSnackBar/>
            <Outlet/>
        </div>
    );
};