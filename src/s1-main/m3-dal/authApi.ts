import axios from "axios";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:7542/2.0/" : "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
})

const instanceForHerokupp = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
})

export const authApi = {
    auth() {
        return instance.post<BaseResponseType>("/auth/me")
    },
    registration(email: string, password: string) {
        return instance.post("auth/register", {email, password})
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post("/auth/login", {
            email,
            password,
            rememberMe
        })
    },
    logout() {
        return instance.delete<{ info: string, error: string }>("auth/me")
    },
    updateUser(name?: string, avatar?: string) {
        return instance.put<{ updatedUser: BaseResponseType, token: string, tokenDeathTime: number }>("auth/me", {name, avatar})
    },
    forgotPass(data: RecoverRequestType) {
        // ForgotResetPassType<{ emailRegExp: {} }>
        return instanceForHerokupp.post<ResponseForgotPassword>("auth/forgot", data)
    },
    resetPass(password: string, resetPasswordToken: string) {
        //ForgotResetPassType<{ resetPasswordToken: string }>
        return instanceForHerokupp.post<{ info: string }>("auth/set-new-password", {
            password,
            resetPasswordToken
        })
    },
    blockUser(id: string, blockReason: string) {
        return instance.post<{ error: string, in: string }>("/auth/block", {id, blockReason})
    }
}

type RecoverRequestType = {
    email: string
    from: string
    message: string
}

export type BaseResponseType<T = string, D = number> = {
    _id: string
    email: string
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    error: string
    token: T
    tokenDeathTime: D
    avatar?: null | string
}

export type AuthMeType = {
    error: string
    method: string
    url: string
    query: string
    body: {}
}
export type ResponseForgotPassword = {
    answer: boolean,
    html: boolean,
    info: string,
    success: boolean
}
export type ForgotResetPassType<T = {}, D = string> = {
    error: string
    emailRegExp: T
    resetPasswordToken: D
    in: string
}