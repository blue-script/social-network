import {AppRootStateType, StoreActionsTypes} from "./redux-store"
import {AnyAction, Dispatch} from "redux";
import {authAPI, AuthDataType, securityAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = "samurai-network/auth/SET-USER-DATA"
const SET_AUTHORIZATION = "samurai-network/auth/SET-AUTHORIZATION"
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET-CAPTCHA-URL-SUCCESS"

const initialState: AuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state: AuthType = initialState, action: StoreActionsTypes): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
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
export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
}) as const

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
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaURL())
        }
        const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
}
export const getCaptchaURL = () => async (dispatch: Dispatch) => {
    const response = await securityAPI.getCaptchaURL()
    const captchaUrl = response.data.url

    dispatch((getCaptchaUrlSuccess(captchaUrl)))
}
export const logout = () => async (dispatch: ThunkDispatch<AppRootStateType, any, AnyAction>) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch((setAuthUserData({id: null, email: null, login: null, isAuth: false, captchaUrl: null})))
    }
}

export default authReducer

// types
export type AuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}