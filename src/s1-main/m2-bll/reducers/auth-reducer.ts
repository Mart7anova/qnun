import {authApi} from "../../m3-dal/authApi";
import {Dispatch} from "redux";

export type AuthType = {
    isAuth: boolean
}
const initialState = {
    isAuth: false
}

export const authReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case "AUTH/REGISTRATION": {
            return {...state, isAuth: action.payload.value}
        }
        default:
            return state
    }
}

type ActionsType = RegistrationType

type RegistrationType = ReturnType<typeof auth>

const auth = (value: boolean) => {
    return {
        type: "AUTH/REGISTRATION",
        payload: {value}
    } as const
}

export const registrationThunk = (email: string, password: string) => async (dispatch: Dispatch) => {
    await authApi.registration(email, password)
    dispatch(auth(true))
}

