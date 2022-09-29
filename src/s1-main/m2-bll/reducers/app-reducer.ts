import {AppThunk} from 's1-main/m2-bll/store';
import {authApi} from 's1-main/m3-dal/authApi';
import {isLoggedIn} from 's1-main/m2-bll/reducers/auth-reducer';
import {setProfile} from 's1-main/m2-bll/reducers/profile-reducer';

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed" | ""

const initialState = {
    status: "loading" as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}

//reducer
export const appReducer = (state: AppReducerType = initialState, action: ActionsType): AppReducerType => {
    switch (action.type) {
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        case "APP/SET-APP-STATUS-STATUS":
            return {...state, status: action.status}
        case "APP/SET-APP-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}


//actions
export const setAppInitialized = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)
export const setAppStatus = (status: RequestStatusType) => ({type: "APP/SET-APP-STATUS-STATUS", status} as const)
export const setAppError = (error: string | null) => ({type: "APP/SET-APP-ERROR", error} as const)
//thunks
export const initializeApp = (): AppThunk => async (dispatch) => {
    try {
        const {data} = await authApi.auth()
        dispatch(setProfile(data))
        dispatch(isLoggedIn(true))
    } catch (err) {
        dispatch(isLoggedIn(false))
    } finally {
        dispatch(setAppInitialized(true))
    }
}

//types
export type AppReducerType = typeof initialState

type ActionsType = SetAppInitializedType | ChangeStatusType | ErrorMessageType

type SetAppInitializedType = ReturnType<typeof setAppInitialized>
type ChangeStatusType = ReturnType<typeof setAppStatus>
type ErrorMessageType = ReturnType<typeof setAppError>