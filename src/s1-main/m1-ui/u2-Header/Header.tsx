import React from 'react';
import style from './Header.module.scss'
import {NavLink} from 'react-router-dom';
import {
    login,
    newPassword,
    pageNotFound,
    profile,
    registration,
    resetPassword,
    showComponents
} from '../u1-Route/Variables/routeVariables';

const activeClass = (props: {isActive: boolean}) => props.isActive ? style.active : ''

export const Header = () => {

    return (
        <header className={style.headerContainer}>
            <NavLink to={showComponents} className={activeClass}>Home</NavLink>
            <NavLink to={profile} className={activeClass}>Profile</NavLink>
            <NavLink to={login} className={activeClass}>Login</NavLink>
            <NavLink to={registration} className={activeClass}>Registration</NavLink>
            <NavLink to={resetPassword} className={activeClass}>Forgot password</NavLink>
            <NavLink to={newPassword} className={activeClass}>New password</NavLink>
            <NavLink to={pageNotFound} className={activeClass}>Page not found</NavLink>
        </header>
    );
};