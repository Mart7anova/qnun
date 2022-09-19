import {authApi} from '../../m3-dal/authApi';
import {setProfile} from './profile-reducer';
import {AppThunk} from '../store';

export type AuthType = {
    isLoggedIn: boolean,
    isAuth: boolean
}
const initialState = {
    isLoggedIn: false,
    isAuth: false
}

export const authReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case 'AUTH/LOGIN': {
            return {...state, isLoggedIn: action.payload.value}
        }
        case 'AUTH/REGISTRATION': {
            return {...state, isAuth: action.payload.value}
        }
        default:
            return state
    }
}

type ActionsType = RegistrationType | LoginType

type RegistrationType = ReturnType<typeof isLoggedIn>
type LoginType = ReturnType<typeof auth>

const isLoggedIn = (value: boolean) => {
    return {
        type: 'AUTH/LOGIN',
        payload: {value}
    } as const
}
const auth = (value: boolean) => {
    return {
        type: 'AUTH/REGISTRATION',
        payload: {value}
    } as const
}

export const registrationThunk = (email: string, password: string): AppThunk => async (dispatch) => {
    try {
        await authApi.registration(email, password)
        dispatch(auth(true))
    } catch (e) {
        console.log(e)
    }


}

export const loginThunk = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    try {
        const {data} = await authApi.login(email, password, rememberMe)
        dispatch(isLoggedIn(true))
        dispatch(setProfile(data))
    } catch (e) {
        console.log(e)
    }
}