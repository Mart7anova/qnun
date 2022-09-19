import {authApi} from '../../m3-dal/authApi';
import {setProfile} from './profile-reducer';
import {AppThunk} from '../store';

export type AuthType = {
		isAuth: boolean
}
const initialState = {
		isAuth: false
}

export const authReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
		switch (action.type) {
				case 'AUTH/REGISTRATION': {
						return {...state, isAuth: action.payload.value}
				}
				default:
						return state
		}
}

type ActionsType = RegistrationType

type RegistrationType = ReturnType<typeof auth>

const auth = (value: boolean) => {
		return {
				type: 'AUTH/REGISTRATION',
				payload: {value}
		} as const
}

export const registrationThunk = (email: string, password: string):AppThunk => async (dispatch) => {
		await authApi.registration(email, password)
		dispatch(auth(true))
}

export const loginThunk = (email: string, password: string, rememberMe: boolean):AppThunk => async (dispatch) => {
		try {
				const {data} = await authApi.login(email, password, rememberMe)
				dispatch(auth(true))
				dispatch(setProfile(data))
		} catch (e) {
		}
}