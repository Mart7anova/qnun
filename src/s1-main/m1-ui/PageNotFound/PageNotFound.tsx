import React from 'react';
import style from './PageNotFound.module.scss'
import {Link} from 'react-router-dom';
import {registration, showComponents} from '../u1-Route/Variables/routeVariables';

export const PageNotFound = () => {
    return (
        <div className={style.pageContainer}>
            <h1>Error 404</h1>
            <h2>Page not found</h2>
            <span>Go <Link to={registration}>home</Link></span>
        </div>
    );
};