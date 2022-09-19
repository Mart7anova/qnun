import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header2} from './common/c1-components/Header/Header';

export const Main = () => {
    return (
        <div>
            <Header2/>
            <Outlet/>
        </div>
    );
};