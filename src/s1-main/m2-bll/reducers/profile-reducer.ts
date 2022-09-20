import {AppThunk} from '../store';
import {authApi, BaseResponseType} from '../../m3-dal/authApi';

const initialState = {
		profile: {} as BaseResponseType,
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
export const setProfile = (profile: BaseResponseType) =>
		({type: 'PROFILE/SET-PROFILE', profile} as const)

//thunks
export const updateUser = (name?: string, avatar?: string):AppThunk => async (dispatch) =>{
	try {
		const {data} = await authApi.updateUser(name, avatar)
		console.log(data)
		dispatch(setProfile(data.updatedUser))
	}catch (e) {

	}
}

//types
type ProfileStateType = {
		profile: BaseResponseType
}
type ActionsType = SetProfileActionType

export type SetProfileActionType = ReturnType<typeof setProfile>

/*
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
}*/
