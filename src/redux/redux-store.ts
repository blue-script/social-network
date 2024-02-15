import {combineReducers, createStore} from 'redux'
import profileReducer, {addPostActionCreator, setUserProfile, updateNewPostTextActionCreator} from "./profile-reducer"
import dialogsReducer, {sendMessageCreator, updateNewMessageTextCreator} from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer, {
  follow,
  setCurrentPage,
  setUsers,
  setTotalUsersCount,
  toggleIsFetching,
  unfollow
} from "./users-reducer"
import authReducer, {setAuthUserData} from "./auth-reducer"

export type ActionsTypes =
  ReturnType<typeof sendMessageCreator>
  | ReturnType<typeof updateNewMessageTextCreator>
  | ReturnType<typeof addPostActionCreator>
  | ReturnType<typeof updateNewPostTextActionCreator>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof follow>
  | ReturnType<typeof unfollow>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof setAuthUserData>

export type StoreType = typeof store
export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
})
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store

export default store