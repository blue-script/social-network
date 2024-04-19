import {BaseThunkType, InferActionsType} from "./redux-store"
import {FormAction, stopSubmit} from "redux-form";
import {ResultCodes} from "../enums/enums";
import {authAPI, AuthDataType} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: AuthActionsType): initialStateType => {
    switch (action.type) {
        case "SN/auth/SET-USER-DATA":
        case "SN/auth/GET-CAPTCHA-URL-SUCCESS":
            return {...state, ...action.payload}
        case "SN/auth/SET-AUTHORIZATION":
            return {...state, isAuth: true}
        default: {
            return state
        }
    }
}

const actions = {
    setAuthUserData: (data: initialStateType, isAuth: boolean = false) => ({
        type: "SN/auth/SET-USER-DATA",
        payload: {...data, isAuth}
    }) as const,
    setAuthorization: (isAuth: boolean) => ({type: "SN/auth/SET-AUTHORIZATION", isAuth} as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: "SN/auth/GET-CAPTCHA-URL-SUCCESS",
        payload: {captchaUrl}
    }) as const
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const response = await authAPI.me()
    if (response.resultCode === ResultCodes.Success) {
        const data = response.data
        dispatch(actions.setAuthUserData(data, true))
    }
}
export const login = (formData: AuthDataType): ThunkType => async (dispatch) => {
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
export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaURL()
    const captchaUrl = data.url

    dispatch((actions.getCaptchaUrlSuccess(captchaUrl)))
}
export const logout = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout()
    if (data.resultCode === ResultCodes.Success) {
        dispatch((actions.setAuthUserData({id: null, email: null, login: null, isAuth: false, captchaUrl: null})))
    }
}

export default authReducer

type initialStateType = typeof initialState
export type AuthActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<AuthActionsType | FormAction>