import React from 'react';
import {Header} from './u2-Header/Header';
import {Outlet} from 'react-router-dom';

export const Main = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};