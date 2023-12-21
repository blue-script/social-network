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
  newMessage: string
}
export type SidebarType = {
  friends: FriendType[]
}
export type StateType = {
  profilePage: ProfilePageType
  dialogsPage: DialogsPageType
  sidebar: SidebarType
}
export type RootStoreType = {
  _state: StateType
  addPost: () => void
  updateNewPostText: (postText: string) => void
  sendMessage: () => void
  updateNewMessageText: (messageText: string) => void
  subscriber: (observer: (state: StateType) => void) => void
  _callSubscriber: (state: StateType) => void
  getState: () => StateType
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
      newMessage:
        '',
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
  getState() {
    return this._state
  },
  addPost() {
    const newPost: PostType = {
      id: this._state.profilePage.posts.length + 1,
      message: this._state.profilePage.newPostText,
      likesCount: 0
    }
    this._state.profilePage.posts.push(newPost)
    this._state.profilePage.newPostText = ''
    this._callSubscriber(this._state)
  },
  updateNewPostText(postText: string) {
    this._state.profilePage.newPostText = postText
    this._callSubscriber(this._state)
  },
  sendMessage() {
    this._state.dialogsPage.messages.push({id: this._state.dialogsPage.messages.length + 1, message: this._state.dialogsPage.newMessage})
    this._state.dialogsPage.newMessage = ''
    this._callSubscriber(this._state)
  },
  updateNewMessageText(messageText: string) {
    this._state.dialogsPage.newMessage = messageText
    this._callSubscriber(this._state)
  },
  _callSubscriber() {
    console.log('hi')
  },
  subscriber(observer) {
    this._callSubscriber = observer
  }
}