import {combineReducers, createStore} from 'redux'
import profileReducer, {addPostActionCreator, updateNewPostTextActionCreator} from './profile-reducer'
import dialogsReducer, {sendMessageCreator, updateNewMessageTextCreator} from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer, {
  followAC,
  setCurrentPageAC,
  setUsersAC,
  setUsersTotalCountAC,
  toggleIsFetchingAC,
  unfollowAC
} from "./users-reducer"

export type ActionsTypes =
  ReturnType<typeof sendMessageCreator>
  | ReturnType<typeof updateNewMessageTextCreator>
  | ReturnType<typeof addPostActionCreator>
  | ReturnType<typeof updateNewPostTextActionCreator>
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setUsersTotalCountAC>
  | ReturnType<typeof toggleIsFetchingAC>

export type StoreType = typeof store
export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer
})
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store

export default store