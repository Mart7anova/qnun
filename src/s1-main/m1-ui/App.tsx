import React, {useEffect} from 'react';
import './App.module.scss';
import style from './App.module.scss'
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../m2-bll/store';
import {AppRoute} from './u1-Route/appRoute';
import {Spinner} from 's1-main/m1-ui/common/c1-components/Spinner/Spinner';
import {initializeApp} from 's1-main/m2-bll/reducers/app-reducer';
import {getIsInitialized} from '../m2-bll/selectors/app-selectors';

export const App = () => {
    const appInitialized = useSelector<AppRootStateType, boolean>(getIsInitialized)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeApp())
    }, [])

    if (!appInitialized) return <Spinner/>

    return (
        <div className={style.App}>
            <AppRoute/>
        </div>
    );
}
