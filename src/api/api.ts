import axios from "axios"
import {UserType} from "../components/Users/UsersContainer"
import {AuthType} from "../redux/auth-reducer"
import {ProfileType} from "../redux/profile-reducer";

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

type FollowResponseType = {
  resultCode: number
  messages: string[]
  data: {}
}

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
    return instance.post<FollowResponseType>(`follow/${userId}`)
  },
  unfollow(userId: number) {
    return instance.delete<FollowResponseType>(`follow/${userId}`)
  },
  getProfile(userId: string) {
    return instance.get<ProfileType>(`profile/${userId}`)
  },
}
// me and follow unfollow

export const authAPI = {
  me() {
    return instance.get<AuthResponseType>(`auth/me`)
  }
}
