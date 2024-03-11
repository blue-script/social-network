import {applyMiddleware, combineReducers, createStore} from 'redux'
import profileReducer, {
    addPostActionCreator, getUserStatus, setStatus,
    setUserProfile,
    updateNewPostTextActionCreator
} from "./profile-reducer"
import dialogsReducer, {sendMessageCreator, updateNewMessageTextCreator} from './dialogs-reducer'
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
import authReducer, {setAuthUserData} from "./auth-reducer"
import thunkMiddleware from "redux-thunk";

export type ActionsTypes =
    ReturnType<typeof sendMessageCreator>
    | ReturnType<typeof updateNewMessageTextCreator>
    | ReturnType<typeof addPostActionCreator>
    | ReturnType<typeof updateNewPostTextActionCreator>
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

export type StoreType = typeof store
export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
})
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

export default store