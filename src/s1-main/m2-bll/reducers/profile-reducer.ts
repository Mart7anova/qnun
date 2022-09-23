import {AppThunk} from '../store';
import {authApi, ProfileResponseType} from '../../m3-dal/authApi';

const initialState = {
		profile: {} as ProfileResponseType,
}

export const profileReducer = (state: ProfileStateType = initialState, action: ActionsType): ProfileStateType => {
		switch (action.type) {
				case 'PROFILE/SET-PROFILE':
						return {...state, profile: action.profile}
				default: return state
		}
}
//actions
export const setProfile = (profile: ProfileResponseType) =>
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
type ProfileStateType = typeof initialState

export type SetProfileActionType = ReturnType<typeof setProfile>

type ActionsType = SetProfileActionType



