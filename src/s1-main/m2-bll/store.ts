import {combineReducers, createStore} from 'redux';
import {authReducer} from './reducers/auth-reducer';
import {profileReducer} from './reducers/profile-reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer
})

export const store = createStore(rootReducer)