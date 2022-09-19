// @ts-ignore
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunkMiddleware from "redux-thunk";
import {authReducer} from './reducers/auth-reducer';
import {profileReducer} from './reducers/profile-reducer';
import {useDispatch} from "react-redux";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch