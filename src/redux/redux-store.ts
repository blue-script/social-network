import {combineReducers, createStore} from 'redux';
import profileReducer, {addPostActionCreator, updateNewPostTextActionCreator} from './profile-reducer';
import dialogsReducer, {sendMessageCreator, updateNewMessageTextCreator} from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

export type ActionsTypes = ReturnType<typeof sendMessageCreator> | ReturnType<typeof updateNewMessageTextCreator> | ReturnType<typeof addPostActionCreator> | ReturnType<typeof updateNewPostTextActionCreator>
export type PostType = {
  id: number
  message: string
  likesCount: number
}
export type DialogType = {
  id: number
  name: string
}
export type MessageType = {
  id?: number
  message: string
}
export type FriendType = {
  id: number
  name: string
}
export type ProfilePageType = {
  posts: PostType[]
  newPostText: string
}
export type DialogsPageType = {
  dialogs: DialogType[]
  messages: MessageType[]
  newMessageBody: string
}
export type SidebarType = {
  friends: FriendType[]
}

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer
})
export const store = createStore(reducers)
export type StoreType = typeof store
export type AppRootStateType = ReturnType<typeof reducers>


export default store