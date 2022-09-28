import {AppThunk} from 's1-main/m2-bll/store';
import {authApi, ProfileResponseType} from 's1-main/m3-dal/authApi';
import {setAppStatus} from "./app-reducer";
import {errorUtils} from 'utils/error-utils';

const initialState = {
    profile: {} as ProfileResponseType,
}

export const profileReducer = (state: ProfileStateType = initialState, action: ActionsType): ProfileStateType => {
    switch (action.type) {
        case 'PROFILE/SET-PROFILE':
            return {...state, profile: action.profile}
        default:
            return state
    }
}
//actions
export const setProfile = (profile: ProfileResponseType) => ({type: 'PROFILE/SET-PROFILE', profile} as const)

//thunks
export const updateUser = (name?: string, avatar?: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        const {data} = await authApi.updateUser(name, avatar)
        dispatch(setProfile(data.updatedUser))
    } catch (e) {
        errorUtils(e,dispatch)
    } finally {
        dispatch(setAppStatus("idle"))
    }
}

//types
type ProfileStateType = typeof initialState

type ActionsType = ReturnType<typeof setProfile>