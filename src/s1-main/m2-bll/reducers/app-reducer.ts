import {AppThunk} from 's1-main/m2-bll/store';
import {authApi} from 's1-main/m3-dal/authApi';
import {isLoggedIn} from 's1-main/m2-bll/reducers/auth-reducer';
import {setProfile} from 's1-main/m2-bll/reducers/profile-reducer';

const initialState = {
		isInitialized: false,
		status: 'loading' as RequestStatusType,
		error: null as null | string,
}

//reducer
export const appReducer = (state: AppReducerType = initialState, action: ActionsType): AppReducerType => {
		switch (action.type) {
				case 'APP/SET-IS-INITIALIZED':
				case 'APP/SET-APP-STATUS-STATUS':
				case 'APP/SET-APP-ERROR':
						return {...state, ...action.payload}
				default:
						return state
		}
}

//actions
export const setAppInitialized = (isInitialized: boolean) => ({
		type: 'APP/SET-IS-INITIALIZED',
		payload: {isInitialized}
} as const)
export const setAppStatus = (status: RequestStatusType) => ({
		type: 'APP/SET-APP-STATUS-STATUS',
		payload: {status}
} as const)
export const setAppError = (error: string | null) => ({type: 'APP/SET-APP-ERROR', payload: {error}} as const)

//thunks
export const initializeApp = (): AppThunk => async (dispatch) => {
		dispatch(setAppStatus('loading'))
		try {
				const {data} = await authApi.auth()
				dispatch(setProfile(data))
				dispatch(isLoggedIn(true))
		} catch (err) {
				dispatch(isLoggedIn(false))
		} finally {
				dispatch(setAppInitialized(true))
				dispatch(setAppStatus('idle'))
		}
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' | ''

export type AppReducerType = typeof initialState

type ActionsType = |
		ReturnType<typeof setAppInitialized>
		| ReturnType<typeof setAppStatus>
		| ReturnType<typeof setAppError>

