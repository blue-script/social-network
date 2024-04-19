import axios from "axios"
import {ResultCodes} from "../enums/enums";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {"API-KEY": "f541e741-b190-4109-afae-de12c3df8816"},
})

export type APIResponseType<T = {}> = {
    resultCode: ResultCodes
    messages: string[]
    data: T
}
