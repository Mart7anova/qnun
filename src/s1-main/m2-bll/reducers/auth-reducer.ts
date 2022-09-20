import {authApi} from '../../m3-dal/authApi';
import {setProfile} from './profile-reducer';
import {AppThunk} from '../store';

export type AuthType = {
    isLoggedIn: boolean,
    isAuth: boolean,
    statusRequest: null | string,
}
const initialState = {
    isLoggedIn: false,
    isAuth: false,
    statusRequest: null
} as AuthType

export const authReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case 'AUTH/LOGIN': {
            return {...state, isLoggedIn: action.payload.value}
        }
        case 'AUTH/REGISTRATION': {
            return {...state, isAuth: action.payload.value}
        }
        case 'STATUS-REQUEST/REGISTRATION': {
            return {...state, statusRequest: action.payload.value}
        }
        default:
            return state
    }
}

type ActionsType = RegistrationType | LoginType | statusRequestType

type RegistrationType = ReturnType<typeof isLoggedIn>
type LoginType = ReturnType<typeof auth>
type statusRequestType = ReturnType<typeof statusRequest>

export const isLoggedIn = (value: boolean) => {
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

export const statusRequest = (value: string | null) => {
    return {
        type: 'STATUS-REQUEST/REGISTRATION',
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

export const logout = (): AppThunk => async (dispatch) =>{
    try {
        await authApi.logout()
        dispatch(isLoggedIn(false))
    }catch (e) {
        console.log(e)
    }
}

export const forgotPass = (email: string): AppThunk => async (dispatch) => {
    dispatch(statusRequest('request has been sent'))
    try {
        const {data} = await authApi.forgotPass({email,
            from: 'test-front-admin <mart7anova7@gmail.com>',
            message: `<div>Перейдите по ссылке, чтобы продолжить востановление пароля <a href='http://localhost:3000/#/newPassword/$token$'>link</a></div>`
        })
        if(data.success){

        }
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(statusRequest(null))
    }
}