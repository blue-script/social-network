import {ResultCodes} from "../enums/enums";
import {instance, APIResponseType} from "./api";

export const authAPI = {
    me() {
        return instance.get<APIResponseType<AuthType>>(`auth/me`).then(res => res.data)
    },
    login(authData: AuthDataType) {
        return instance.post<APIResponseType<LoginDataType>>('auth/login', authData).then(res => res.data)
    },
    logout() {
        return instance.delete<APIResponseType>('auth/login').then(res => res.data)
    }
}

type AuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
export type AuthDataType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export type LoginDataType = {
    id: number
    login: string
    email: string
}