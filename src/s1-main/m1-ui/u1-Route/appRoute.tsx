import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {PageNotFound} from '../common/c1-components/PageNotFound/PageNotFound';
import {Login} from '../../../s2-features/f1-auth/a1-login/Login';
import {Registration} from '../../../s2-features/f1-auth/a2-registration/Registration';
import {ForgotPassword} from '../../../s2-features/f1-auth/a3-forgotPassword/ForgotPassword';
import {NewPassword} from '../../../s2-features/f1-auth/a4-newPassword/NewPassword';
import {Profile} from '../../../s2-features/f2-profile/Profile';
import {PATH} from './Variables/routeVariables';
import {Main} from '../Main';
import {PacksPage} from 's2-features/f3-packs/PacksPage';
import {CheckEmail} from '../../../s2-features/f1-auth/a5-checkEmail/CheckEmail';
import {CardsPage} from 's2-features/f4-cards/CardsPage';
import {LearnPage} from '../../../s2-features/f5-learn/LearnPage';

export const AppRoute = () => {

    return (
        <Routes>
            <Route path={PATH.PACKS_LIST} element={<Main/>}>
                <Route path={PATH.OTHER_ROUTS} element={<Navigate to={PATH.PAGE_NOT_FOUND}/>}/>
                <Route path={PATH.PAGE_NOT_FOUND} element={<PageNotFound/>}/>

                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>

                <Route index element={<PacksPage/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.CARD} element={<CardsPage/>}/>
                <Route path={PATH.LEARN_CARD} element={<LearnPage/>}/>
            </Route>
        </Routes>
    );
};
