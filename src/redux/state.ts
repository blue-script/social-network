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
}
export type DialogsPageType = {
  dialogs: DialogType[]
  messages: MessageType[]
}
export type SidebarType = {
  friends: FriendType[]
}
export type RootStateType = {
  profilePage: ProfilePageType
  dialogsPage: DialogsPageType
  sidebar: SidebarType
}

export let state: RootStateType = {
  profilePage: {
    posts: [
      {id: 1, message: 'Hi, how are you?', likesCount: 12},
      {id: 2, message: 'It\'s my first post', likesCount: 11}
    ],
  },
  dialogsPage: {
    dialogs: [
      {id: 1, name: 'Dimych'},
      {id: 2, name: 'Valera'},
      {id: 3, name: 'Sasha'},
      {id: 4, name: 'Petia'},
      {id: 5, name: 'Masha'},
    ],
    messages: [
      {id: 1, message: 'Hi'},
      {id: 2, message: 'How are you?'},
      {id: 3, message: 'Yo'},
      {id: 4, message: 'Fine, bro'},
    ],
  },
  sidebar: {
    friends: [
      {id: 1, name: 'Dimych'},
      {id: 2, name: 'Valera'},
      {id: 3, name: 'Sasha'},
    ],
  }
}

export const addPost = (message: string) => {
  state = {
    ...state,
    'profilePage': {
      ...state.profilePage,
      'posts': [...state.profilePage.posts, {
        id: state.profilePage.posts.length + 1,
        message: message,
        likesCount: 0
      }]
    }
  }
}

export default state