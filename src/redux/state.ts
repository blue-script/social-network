let rerenderEntireTree = (state: RootStateType) => {
  console.log('render state')
}

export const subscriber = (observer: (state: RootStateType) => void) => {
  rerenderEntireTree = observer
}

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
export type RootStateType = {
  profilePage: ProfilePageType
  dialogsPage: DialogsPageType
  sidebar: SidebarType
}

export var state: RootStateType = {
  profilePage: {
    posts: [
      {id: 1, message: 'Hi, how are you?', likesCount: 12},
      {id: 2, message: 'It\'s my first post', likesCount: 11}
    ],
    newPostText: 'Please, enter text',
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
    newMessage: '',
  },
  sidebar: {
    friends: [
      {id: 1, name: 'Dimych'},
      {id: 2, name: 'Valera'},
      {id: 3, name: 'Sasha'},
    ],
  }
}

export const addPost = () => {
  const newPost: PostType = {
    id: state.profilePage.posts.length + 1,
    message: state.profilePage.newPostText,
    likesCount: 0
  }
  state.profilePage.posts.push(newPost)
  state.profilePage.newPostText = ''
  rerenderEntireTree(state)
}
export const updateNewPostText = (postText: string) => {
  state.profilePage.newPostText = postText
  rerenderEntireTree(state)
}
export const sendMessage = () => {
  state.dialogsPage.messages.push({id: state.dialogsPage.messages.length + 1, message: state.dialogsPage.newMessage})
  state.dialogsPage.newMessage= ''
  rerenderEntireTree(state)
}
export const updateNewMessageText = (messageText: string) => {
  state.dialogsPage.newMessage = messageText
  rerenderEntireTree(state)
}

