import React, {useEffect} from 'react';
import './App.module.scss';
import style from './App.module.scss'
import {HashRouter} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../m2-bll/store';
import {AppRoute} from './u1-Route/appRoute';
import {Spinner} from '../../assets/Spinner';
import {initializeApp} from '../m2-bll/reducers/app-reducer';

export const App = () => {
		const appInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
		const dispatch = useAppDispatch()
		useEffect(() => {
				dispatch(initializeApp())
		}, [])
		if (!appInitialized) return <Spinner/>
		return (
				<div className={style.App}>
						<HashRouter>
								<AppRoute/>
						</HashRouter>
				</div>
		);
}
