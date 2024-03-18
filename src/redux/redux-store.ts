import {applyMiddleware, combineReducers, createStore} from 'redux'
import profileReducer, {
    addPostActionCreator,
    setStatus,
    setUserProfile
} from "./profile-reducer"
import dialogsReducer, {sendMessageCreator} from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer, {
    followSuccess,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toggleFollowingProgress,
    toggleIsFetching,
    unfollowSuccess
} from "./users-reducer"
import authReducer, {setAuthorization, setAuthUserData} from "./auth-reducer"
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

export default store

//types
export type StoreType = typeof store
export type AppRootStateType = ReturnType<typeof rootReducer>
export type StoreActionsTypes =
    ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof setUserProfile>
    | ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalUsersCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleFollowingProgress>
    | ReturnType<typeof setAuthUserData>
    | ReturnType<typeof setStatus>
    | ReturnType<typeof setAuthorization>