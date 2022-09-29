import {authApi} from 's1-main/m3-dal/authApi';
import {setProfile} from 's1-main/m2-bll/reducers/profile-reducer';
import {AppThunk} from 's1-main/m2-bll/store';
import {setAppStatus} from './app-reducer';
import {errorUtils} from 'utils/error-utils';

const initialState = {
    isLoggedIn: false,
    isAuth: false,
    isRequestSuccess: false
}

export const authReducer = (state: AuthReducerType = initialState, action: ActionsType): AuthReducerType => {
    switch (action.type) {
        case 'AUTH/LOGIN':
        case 'AUTH/REGISTRATION':
        case 'STATUS-REQUEST/REGISTRATION':
            return {...state, ...action.payload}
        default:
            return state
    }
}

//AC
export const isLoggedIn = (isLoggedIn: boolean) => ({type: 'AUTH/LOGIN', payload: {isLoggedIn}} as const)
export const setIsAuth = (isAuth: boolean) => ({type: 'AUTH/REGISTRATION', payload: {isAuth}} as const)
export const setIsRequestSuccess = (isRequestSuccess: boolean) => ({
    type: 'STATUS-REQUEST/REGISTRATION',
    payload: {isRequestSuccess}
} as const)

//thunk
export const registration = (email: string, password: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        await authApi.registration(email, password)
        dispatch(setIsAuth(true))
    } catch (e) {
        errorUtils(e,dispatch)
    } finally {
        dispatch(setAppStatus("idle"))
    }
}

export const login = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        const {data} = await authApi.login(email, password, rememberMe)
        dispatch(isLoggedIn(true))
        dispatch(setProfile(data))
    }catch (e) {
        errorUtils(e,dispatch)
    } finally {
        dispatch(setAppStatus("idle"))
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        await authApi.logout()
        dispatch(isLoggedIn(false))
    } catch (e) {
        errorUtils(e,dispatch)
    } finally {
        dispatch(setAppStatus("idle"))
    }
}

export const forgotPassword = (email: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        await authApi.forgotPass({
            email,
            from: 'test-front-admin <1@gmail.com>',
            message: `<div>Перейдите по ссылке, чтобы продолжить востановление пароля <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
        })
        dispatch(setIsRequestSuccess(true))
    } catch (e) {
        errorUtils(e,dispatch)
    } finally {
        dispatch(setAppStatus("idle"))
    }
}

export const updatePassword = (password: string, resetPasswordToken: string): AppThunk => async (dispatch) => {
    dispatch(setAppStatus("loading"))
    try {
        await authApi.resetPass(password, resetPasswordToken)
        dispatch(setIsRequestSuccess(true))
    } catch (e) {
        errorUtils(e,dispatch)
    } finally {
        dispatch(setAppStatus("idle"))
    }
}

//types
export type AuthReducerType = typeof initialState

type ActionsType = ReturnType<typeof isLoggedIn>
    | ReturnType<typeof setIsAuth>
    | ReturnType<typeof setIsRequestSuccess>

