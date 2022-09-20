import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {authReducer} from './reducers/auth-reducer';
import {profileReducer} from './reducers/profile-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {appReducer} from './reducers/app-reducer';

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
		auth: authReducer,
		profile: profileReducer,
		app: appReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<Returntype = void> = ThunkAction<Returntype, AppRootStateType, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector