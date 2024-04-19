import axios from "axios"
import {ProfileType} from "../redux/profile-reducer";
import {UserType} from "../types/types";
import {ResultCodes} from "../enums/enums";

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
    },
    savePhoto(photoFile: File) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<ResponseType<{ photos: { small: string, large: string } }>>(`profile/photo`, formData,
            {headers: {'Content-Type': 'multipart/form-data'}}
        )
    },
    saveProfile(profile: Partial<ProfileRequestType>) {
        return instance.put<ResponseType<{}>>(`profile`, profile)
    }
}

export const authAPI = {
    me() {
        return instance.get<AuthResponseType>(`auth/me`).then(res => res.data)
    },
    login(authData: AuthDataType) {
        return instance.post<ResponseType<LoginDataType>>('auth/login', authData).then(res=>res.data)
    },
    logout() {
        return instance.delete<ResponseType<{}>>('auth/login')
    }
}
export const securityAPI = {
    getCaptchaURL() {
        return instance.get<CapchaType>(`security/get-captcha-url`)
    }
}

// types
export type CapchaType = {
    url: string
}
export type UsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string
}
type AuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}
export type AuthResponseType = {
    "data": AuthType
    "messages": string[]
    "fieldsErrors": string[]
    "resultCode": ResultCodes
}
export type ResponseType<T> = {
    resultCode: ResultCodes
    messages: string[]
    data: T
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
type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
export type ProfileRequestType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
}