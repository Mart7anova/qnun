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

//types
type ProfileStateType = {
		profile: ProfileType | null
}
type ActionsType =
		| SetProfileActionType
export type SetProfileActionType = ReturnType<typeof setProfile>
type ProfileType = {
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