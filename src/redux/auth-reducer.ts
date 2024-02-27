import {ActionsTypes} from "./redux-store"
import {Dispatch} from "redux";
import {authAPI} from "../api/api";

const SET_USER_DATA = "SET-USER-DATA"

export type AuthType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
const initialState: AuthType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state: AuthType = initialState, action: ActionsTypes): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth: true}
        default: {
            return state
        }
    }
}

export const setAuthUserDataSuccess = (data: AuthType) => ({type: SET_USER_DATA, data}) as const

export const setAuthUserData = () => (dispatch: Dispatch) => {
    // this.props.toggleIsFetching(true)
    authAPI.getMe().then(data => {
        // this.props.toggleIsFetching(false)
        dispatch(setAuthUserDataSuccess(data))
    })
}

export default authReducer