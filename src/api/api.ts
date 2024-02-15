import axios from "axios"
import {UserType} from "../components/Users/UsersContainer"
import {AuthType} from "../redux/auth-reducer"

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
  }
}
// me and follow unfollow

export const authAPI = {
  getMe() {
    return instance.get<AuthResponseType>(`auth/me`).then(response => response.data.data)
  }
}

export const followUnfollowAPI = {
  follow(id: number) {
    return instance.post<FollowResponseType>(`follow/${id}`)
  },
  unfollow(id: number) {
    return instance.delete<FollowResponseType>(`follow/${id}`)
  }
}