import profileReducer, {
  addPostActionCreator,
  updateNewPostTextActionCreator,
} from './profile-reducer';
import dialogsReducer, {
  sendMessageCreator,
  updateNewMessageTextCreator,
} from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';

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
  id: number
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
export type StateType = {
  profilePage: ProfilePageType
  dialogsPage: DialogsPageType
  sidebar: SidebarType
}
export type ActionsTypes = ReturnType<typeof sendMessageCreator> | ReturnType<typeof updateNewMessageTextCreator> | ReturnType<typeof addPostActionCreator> | ReturnType<typeof updateNewPostTextActionCreator>

export type RootStoreType = {
  _state: StateType
  subscriber: (observer: (state: StateType) => void) => void
  _callSubscriber: (state: StateType) => void
  getState: () => StateType
  dispatch: (action: ActionsTypes) => void
}

export const store: RootStoreType = {
  _state: {
    profilePage: {
      posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11}
      ],
      newPostText:
        'Please, enter text',
    }
    ,
    dialogsPage: {
      dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Valera'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Petia'},
        {id: 5, name: 'Masha'},
      ],
      messages:
        [
          {id: 1, message: 'Hi'},
          {id: 2, message: 'How are you?'},
          {id: 3, message: 'Yo'},
          {id: 4, message: 'Fine, bro'},
        ],
      newMessageBody: '',
    }
    ,
    sidebar: {
      friends: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Valera'},
        {id: 3, name: 'Sasha'},
      ],
    }
    ,
  },
  _callSubscriber() {
    console.log('hi')
  },

  getState() {
    return this._state
  },
  subscriber(observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)

    this._callSubscriber(this._state)
  }
}
