import {AppRootStateType, StoreActionsTypes} from "./redux-store"
import {AnyAction, Dispatch} from "redux";
import {authAPI, AuthDataType, securityAPI} from "../api/api";
import {ThunkDispatch} from "redux-thunk";
import {stopSubmit} from "redux-form";
import {ResultCodes} from "../enums/enums";

const SET_USER_DATA = "samurai-network/auth/SET-USER-DATA"
const SET_AUTHORIZATION = "samurai-network/auth/SET-AUTHORIZATION"
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET-CAPTCHA-URL-SUCCESS"

type initialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
    captchaUrl: string | null
}

const initialState: initialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action: StoreActionsTypes): initialStateType => {
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

export type SetAuthUserDataActionType = ReturnType<typeof setAuthUserData>
export const setAuthUserData = (data: initialStateType, isAuth: boolean = false) => ({
    type: SET_USER_DATA,
    payload: {...data, isAuth}
}) as const
export type SetAuthorizationActionType = ReturnType<typeof setAuthorization>
export const setAuthorization = (isAuth: boolean) => ({type: SET_AUTHORIZATION, isAuth} as const)
export type GetCaptchaUrlSuccessActionType = ReturnType<typeof getCaptchaUrlSuccess>
export const getCaptchaUrlSuccess = (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl}
}) as const

export const getAuthUserData = () => async (dispatch: Dispatch) => {
    const response = await authAPI.me()
    if (response.resultCode === ResultCodes.Success) {
        const data = response.data
        dispatch(setAuthUserData(data, true))
    }
}
export const login = (formData: AuthDataType) => async (dispatch: ThunkDispatch<AppRootStateType, any, AnyAction>) => {
    const data = await authAPI.login(formData)
    if (data.resultCode === ResultCodes.Success) {
        dispatch(getAuthUserData())
    } else {
        if (data.resultCode === ResultCodes.CaptchaIsRequired) {
            dispatch(getCaptchaURL())
        }
        const message = data.messages.length > 0 ? data.messages[0] : "Some error"
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
    if (response.data.resultCode === ResultCodes.Success) {
        dispatch((setAuthUserData({id: null, email: null, login: null, isAuth: false, captchaUrl: null})))
    }
}

export default authReducer

