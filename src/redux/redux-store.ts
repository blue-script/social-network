import {combineReducers, createStore} from 'redux';
import profileReducer, {addPostActionCreator, updateNewPostTextActionCreator} from './profile-reducer';
import dialogsReducer, {sendMessageCreator, updateNewMessageTextCreator} from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

export type ActionsTypes = ReturnType<typeof sendMessageCreator> | ReturnType<typeof updateNewMessageTextCreator> | ReturnType<typeof addPostActionCreator> | ReturnType<typeof updateNewPostTextActionCreator>



export type StoreType = typeof store
export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer
})
export const store = createStore(rootReducer)

export default store