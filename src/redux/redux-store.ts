import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux'
import profileReducer, {ProfileActionsType} from "./profile-reducer"
import dialogsReducer, {DialogsActionsType} from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer, {UsersActionsType} from "./users-reducer"
import authReducer, {AuthActionsType} from "./auth-reducer"
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer, {AppActionsType} from "./app-reducer";

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

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppRootStateType, unknown, A>

export type StoreType = typeof store
export type AppRootStateType = ReturnType<typeof rootReducer>

