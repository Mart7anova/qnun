import {authApi} from '../../m3-dal/authApi';
import {setProfile} from './profile-reducer';
import {AppThunk} from '../store';
import {AxiosError} from 'axios';

const initialState = {
    isLoggedIn: false,
    isAuth: false,
    isRequestSuccess: false
}

export const authReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case 'AUTH/LOGIN': {
            return {...state, isLoggedIn: action.payload.value}
        }
        case 'AUTH/REGISTRATION': {
            return {...state, isAuth: action.payload.value}
        }
        case 'STATUS-REQUEST/REGISTRATION': {
            return {...state, isRequestSuccess: action.payload.value}
        }
        default:
            return state
    }
}

//AC
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

export const setIsRequestSuccess = (value: boolean) => {
    return {
        type: 'STATUS-REQUEST/REGISTRATION',
        payload: {value}
    } as const
}

//thunk
export const registration = (email: string, password: string): AppThunk => async (dispatch) => {
    try {
        await authApi.registration(email, password)
        dispatch(auth(true))
    } catch (e) {
        console.log(e)
    }
}

export const login = (email: string, password: string, rememberMe: boolean, setLoginFormStatus: ({error}: { error: string }) => void): AppThunk => async (dispatch) => {
    try {
        const {data} = await authApi.login(email, password, rememberMe)
        dispatch(isLoggedIn(true))
        dispatch(setProfile(data))
    } catch (e) {
        const err = e as AxiosError<{ error: string }>
        err.response?.data.error
            ? setLoginFormStatus({error: err.response.data.error})
            : setLoginFormStatus({error: 'some error'})
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    try {
        await authApi.logout()
        dispatch(isLoggedIn(false))
    } catch (e) {

    }
}

export const forgotPassword = (email: string): AppThunk => async (dispatch) => {
    try {
        await authApi.forgotPass({
            email,
            from: 'test-front-admin <1@gmail.com>',
            message: `<div>Перейдите по ссылке, чтобы продолжить востановление пароля <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
        })
        dispatch(setIsRequestSuccess(true))
    } catch (e) {

    }
}

export const updatePassword = (password: string, resetPasswordToken: string): AppThunk => async (dispatch) => {
    try {
        await authApi.resetPass(password, resetPasswordToken)
        dispatch(setIsRequestSuccess(true))
    } catch (e) {

    }
}

//types
export type AuthType = typeof initialState

type RegistrationType = ReturnType<typeof isLoggedIn>
type LoginType = ReturnType<typeof auth>
type statusRequestType = ReturnType<typeof setIsRequestSuccess>

type ActionsType = RegistrationType | LoginType | statusRequestType

