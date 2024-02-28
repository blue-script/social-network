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

export const setAuthUserData = (data: AuthType) => ({type: SET_USER_DATA, data}) as const

export const getAuthUserData = () => (dispatch: Dispatch) => {
    // this.props.toggleIsFetching(true)
    authAPI.me()
        .then(response => {
            if (response.data.resultCode === 0) {
                const data = response.data.data
                // this.props.toggleIsFetching(false)
                dispatch(setAuthUserData(data))
            }
        })
}

export default authReducer