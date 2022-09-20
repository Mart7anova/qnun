import {AppThunk} from '../store';
import {authApi} from '../../m3-dal/authApi';

const initialState = {
		profile: null,
}

export const profileReducer = (state: ProfileStateType = initialState, action: ActionsType): ProfileStateType => {
		switch (action.type) {
				case 'PROFILE/SET-PROFILE':
						return {...state, profile: action.profile}
				default:
						return {...state}
		}
}
//actions
export const setProfile = (profile: ProfileType) =>
		({type: 'PROFILE/SET-PROFILE', profile} as const)

//thunks
export const authMe = ():AppThunk => async (dispatch) =>{
	try {
		const res = await authApi.auth()
		dispatch(setProfile(res.data))
	}catch (e) {

	}
}

//types
type ProfileStateType = {
		profile: ProfileType | null
}
type ActionsType = SetProfileActionType

export type SetProfileActionType = ReturnType<typeof setProfile>

export type ProfileType = {
		_id: string
		email: string
		name: string
		avatar?: string
		publicCardPacksCount: number
		created: Date
		updated: Date
		isAdmin: boolean
		verified: boolean
		rememberMe: boolean;
		error?: string;
}