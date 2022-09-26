import React from 'react';
import style from './PageNotFound.module.scss'
import {PATH} from '../../../u1-Route/Variables/routeVariables';
import {Link} from 'react-router-dom';

export const PageNotFound = () => {
    return (
        <div className={style.pageContainer}>
            <h1>Error 404</h1>
            <h2>Page not found</h2>
            <span>Go <Link to={PATH.PACKS_LIST}>home</Link></span>
        </div>
    );
};