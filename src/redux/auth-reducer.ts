import {AppRootStateType, StoreActionsTypes} from "./redux-store"
import {AnyAction, Dispatch} from "redux";
import {authAPI, AuthDataType} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "samurai-network/auth/SET-USER-DATA"
const SET_AUTHORIZATION = "samurai-network/auth/SET-AUTHORIZATION"

const initialState: AuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: AuthType = initialState, action: StoreActionsTypes): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload}
        case SET_AUTHORIZATION:
            return {...state, isAuth: true}
        default: {
            return state
        }
    }
}

export const setAuthUserData = (data: AuthType, isAuth: boolean = false) => ({
    type: SET_USER_DATA,
    payload: {...data, isAuth}
}) as const
export const setAuthorization = (isAuth: boolean) => ({type: SET_AUTHORIZATION, isAuth} as const)

export const getAuthUserData = () => async (dispatch: Dispatch) => {
    const response = await authAPI.me()
    if (response.data.resultCode === 0) {
        const data = response.data.data
        dispatch(setAuthUserData(data, true))
    }
}
export const login = (formData: AuthDataType) => async (dispatch: ThunkDispatch<AppRootStateType, any, AnyAction>) => {
    const response = await authAPI.login(formData)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const logout = () => async (dispatch: ThunkDispatch<AppRootStateType, any, AnyAction>) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch((setAuthUserData({id: null, email: null, login: null, isAuth: false})))
    }
}

export default authReducer

// types
export type AuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}