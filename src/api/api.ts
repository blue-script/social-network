import axios from "axios"
import {UserType} from "../components/Users/UsersContainer"
import {AuthType} from "../redux/auth-reducer"
import {ProfileType} from "../redux/profile-reducer";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {"API-KEY": "f541e741-b190-4109-afae-de12c3df8816"},
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ResponseType<{}>>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType<{}>>(`follow/${userId}`)
    },
    // getProfile(userId: string) {
    //     console.warn('Obsolete method. Please profileAPI object.')
    //     return profileAPI.getProfile(userId)
    // },
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: string) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put<ResponseType<{}>>(`profile/status/`, {status: status})
    }
}

export const authAPI = {
    me() {
        return instance.get<AuthResponseType>(`auth/me`)
    },
    login(authData: AuthDataType) {
        return instance.post<ResponseType<LoginDataType>>('auth/login', authData)
    },
    logout() {
        return instance.delete<ResponseType<{}>>('auth/login')
    }
}


// types
export type UsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string
}
export type AuthResponseType = {
    "data": AuthType
    "messages": string[]
    "fieldsErrors": string[]
    "resultCode": number
}
export type ResponseType<T> = {
    resultCode: number
    messages: string[]
    data: T
}
export type AuthDataType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: boolean
}
export type LoginDataType = {
    id: number
    login: string
    email: string
}