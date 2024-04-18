import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import profileReducer, {
    AddPostActionCreatorActionType,
    DeletePostActionType,
    SavePhotoSuccessActionType,
    SetStatusActionType,
    SetUserProfileActionType
} from "./profile-reducer"
import dialogsReducer, {SendMessageCreatorActionType} from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer, {
    UsersActionType
} from "./users-reducer"
import authReducer, {
    GetCaptchaUrlSuccessActionType,
    SetAuthorizationActionType,
    SetAuthUserDataActionType
} from "./auth-reducer"
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer, {InitializedSuccessActionType} from "./app-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
// @ts-ignore
window.__store__ = store

export default store

export type StoreType = typeof store
export type AppRootStateType = ReturnType<typeof rootReducer>
export type StoreActionsTypes =
    SendMessageCreatorActionType
    | AddPostActionCreatorActionType
    | SetUserProfileActionType
    | SetAuthUserDataActionType
    | SetStatusActionType
    | SetAuthorizationActionType
    | InitializedSuccessActionType
    | DeletePostActionType
    | SavePhotoSuccessActionType
    | GetCaptchaUrlSuccessActionType
    | UsersActionType
