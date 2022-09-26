import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {authReducer} from 's1-main/m2-bll/reducers/auth-reducer';
import {profileReducer} from 's1-main/m2-bll/reducers/profile-reducer';
import {appReducer} from 's1-main/m2-bll/reducers/app-reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {packsReducer} from 's1-main/m2-bll/reducers/packs-reducer';
import {cardsReducer} from 's1-main/m2-bll/reducers/cards-reducer';

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
		auth: authReducer,
		profile: profileReducer,
		app: appReducer,
		packs:packsReducer,
		cards:cardsReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector