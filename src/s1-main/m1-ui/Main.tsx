import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header2} from './u2-Header/Header';

export const Main = () => {
    return (
        <div>
            <Header2/>
            <Outlet/>
        </div>
    );
};