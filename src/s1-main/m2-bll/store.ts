import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {authReducer} from './reducers/auth-reducer';
import {profileReducer} from './reducers/profile-reducer';
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
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppThunk<Returntype = void> = ThunkAction<Returntype, AppRootStateType, unknown, AnyAction>