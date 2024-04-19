import {UserType} from "../types/types";
import {instance, APIResponseType} from "./api";

export const usersApi = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<UsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`)
    },
}

export type UsersResponseType = {
    items: UserType[]
    totalCount: number
    error: string
}