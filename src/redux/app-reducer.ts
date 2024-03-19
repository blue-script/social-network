import {AppRootStateType, StoreActionsTypes} from "./redux-store"
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS"

const initialState: appType = {
    initialized: false
}

const appReducer = (state: appType = initialState, action: StoreActionsTypes): appType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {...state, initialized: true}
        default: {
            return state
        }
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS}) as const

export const initializeApp = () => (dispatch: ThunkDispatch<AppRootStateType, any, AnyAction>) => {
    dispatch(getAuthUserData())
        .then(()=> dispatch(initializedSuccess()))

}

export default appReducer

//types
export type appType = {
    initialized: boolean
}