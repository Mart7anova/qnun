import {authApi} from 's1-main/m3-dal/authApi';
import {setProfile} from 's1-main/m2-bll/reducers/profile-reducer';
import {AppThunk} from 's1-main/m2-bll/store';
import {AxiosError} from 'axios';
import {changeStatus, errorMessage} from "./app-reducer";

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
export const isLoggedIn = (value: boolean) => ({type: 'AUTH/LOGIN', payload: {value}} as const)
export const setIsAuth = (value: boolean) => ({type: 'AUTH/REGISTRATION', payload: {value}} as const)
export const setIsRequestSuccess = (value: boolean) => ({
    type: 'STATUS-REQUEST/REGISTRATION',
    payload: {value}
} as const)

//thunk
export const registration = (email: string, password: string): AppThunk => async (dispatch) => {
    dispatch(changeStatus("loading"))
    try {
        await authApi.registration(email, password)
        dispatch(setIsAuth(true))
    } catch (err) {
        dispatch(errorMessage((err as Error).message))
    } finally {
        dispatch(changeStatus("idle"))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, setLoginFormStatus: ({error}: { error: string }) => void): AppThunk => async (dispatch) => {
    dispatch(changeStatus("loading"))
    try {
        const {data} = await authApi.login(email, password, rememberMe)
        dispatch(isLoggedIn(true))
        dispatch(setProfile(data))
    } finally {
        dispatch(changeStatus("idle"))
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    dispatch(changeStatus("loading"))
    try {
        await authApi.logout()
        dispatch(isLoggedIn(false))
    } catch (err) {
        dispatch(errorMessage((err as Error).message))
    } finally {
        dispatch(changeStatus("idle"))
    }
}

export const forgotPassword = (email: string): AppThunk => async (dispatch) => {
    dispatch(changeStatus("loading"))
    try {
        await authApi.forgotPass({
            email,
            from: 'test-front-admin <1@gmail.com>',
            message: `<div>Перейдите по ссылке, чтобы продолжить востановление пароля <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
        })
        dispatch(setIsRequestSuccess(true))
    } catch (err) {
        dispatch(errorMessage((err as Error).message))
    } finally {
        dispatch(changeStatus("idle"))
    }
}

export const updatePassword = (password: string, resetPasswordToken: string): AppThunk => async (dispatch) => {
    dispatch(changeStatus("loading"))
    try {
        await authApi.resetPass(password, resetPasswordToken)
        dispatch(setIsRequestSuccess(true))
    } catch (err) {
        dispatch(errorMessage((err as Error).message))
    } finally {
        dispatch(changeStatus("idle"))
    }
}

//types
export type AuthType = typeof initialState

type ActionsType = ReturnType<typeof isLoggedIn>
    | ReturnType<typeof setIsAuth>
    | ReturnType<typeof setIsRequestSuccess>

