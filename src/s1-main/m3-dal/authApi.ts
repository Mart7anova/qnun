import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

const instanceForHeroku = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authApi = {
    auth() {
        return instance.post<ProfileResponseType>('/auth/me')
    },
    registration(email: string, password: string) {
        return instance.post<ResponseRegister>('auth/register', {email, password})
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ProfileResponseType>('/auth/login', {
            email,
            password,
            rememberMe
        })
    },
    logout() {
        return instance.delete<ResponseLogout>('auth/me')
    },
    forgotPass(data: forgotPasswordDataType) {
        return instanceForHeroku.post<ResponseForgotPassword>('auth/forgot', data)
    },
    resetPass(password: string, resetPasswordToken: string) {
        return instanceForHeroku.post<{ info: string }>('auth/set-new-password', {
            password,
            resetPasswordToken
        })
    },
    updateUser(name?: string, avatar?: string) {
        return instance.put<ResponseUpdateUser>('auth/me', {
            name,
            avatar
        })
    },
    blockUser(id: string, blockReason: string) {
        return instance.post('/auth/block', {id, blockReason})
    }
}

//types
type forgotPasswordDataType = {
    email: string
    from: string
    message: string
}

export type ProfileResponseType<T = string, D = number> = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: T
    tokenDeathTime: D
    avatar?: null | string
}

type ResponseRegister = {
    error: string
    email: string
    in: string
}

type ResponseLogout = {
    info: string
}

export type ResponseForgotPassword = {
    info: string
    success: boolean
    answer: boolean
    html: boolean
}

type ResponseUpdateUser = {
    updatedUser: ProfileResponseType,
    token: string,
    tokenDeathTime: number
}
