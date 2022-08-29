import React from 'react';
import './App.module.scss';
import style from './App.module.scss'
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from '../m2-bll/store';
import {AppRoute} from './u1-Route/appRoute';

export const App = () => {
    return (
        <div className={style.App}>
            <HashRouter>
                <Provider store={store}>
                    <AppRoute/>
                </Provider>
            </HashRouter>
        </div>
    );
}
