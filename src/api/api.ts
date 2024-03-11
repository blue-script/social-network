import axios from "axios"
import {UserType} from "../components/Users/UsersContainer"
import {AuthType} from "../redux/auth-reducer"
import {ProfileType} from "../redux/profile-reducer";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {"API-KEY": "099f27bc-5392-4dfc-b68c-8b66ed78d720"},
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`)
    },
    getProfile(userId: string) {
        console.warn('Obsolete method. Please profileAPI object.')
        return profileAPI.getProfile(userId)
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
        return instance.put<ResponseType>(`profile/status/`, {status: status})
    }
}

export const authAPI = {
    me() {
        return instance.get<AuthResponseType>(`auth/me`)
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
type ResponseType = {
    resultCode: number
    messages: string[]
    data: {}
}