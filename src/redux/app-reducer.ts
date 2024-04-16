import {AppRootStateType, StoreActionsTypes} from "./redux-store"
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS"

export type initialStateType = {
    initialized: boolean
}

const initialState: initialStateType = {
    initialized: false
}

const appReducer = (state = initialState, action: StoreActionsTypes): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        default: {
            return state
        }
    }
}

export type InitializedSuccessActionType = ReturnType<typeof initializedSuccess>
export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS}) as const

export const initializeApp = () => (dispatch: ThunkDispatch<AppRootStateType, any, AnyAction>) => {
    dispatch(getAuthUserData())
        .then(() => dispatch(initializedSuccess()))

}

export default appReducer

