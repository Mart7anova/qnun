import {AppThunk} from '../store';
import {authApi} from '../../m3-dal/authApi';
import {isLoggedIn} from './auth-reducer';
import {setProfile} from './profile-reducer';


const initialState: AppReducerType = {
		isInitialized: false,
}
//reducer
export const appReducer = (state: AppReducerType = initialState, action: ActionsType): AppReducerType => {
		switch (action.type) {
				case 'APP/SET-IS-INITIALIZED':
						return {...state, isInitialized: action.value}
				default:
						return {...state}
		}
}


//actions
export const setAppInitialized = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)
//thunks
export const initializeApp = (): AppThunk => async (dispatch) => {
		try {
				const {data} = await authApi.auth()
				dispatch(setProfile(data))
				dispatch(isLoggedIn(true))
		} catch (e) {
				dispatch(isLoggedIn(false))
		} finally {
				dispatch(setAppInitialized(true))
		}
}

//types
export type AppReducerType = {
		isInitialized: boolean
}
type ActionsType =
		| ReturnType<typeof setAppInitialized>
