import {DialogType, MessagesType} from '../components/Dialogs/Dialogs';
import {PostType} from '../components/Profile/MyPosts/Post/Post';
import {FriendType} from '../components/Friends/Friends';

type StateType = {
  profilePage: {
    posts: PostType[]
  }
  dialogsPage: {
    dialogs: DialogType[]
    messages: MessagesType[]
  }
  sidebar: {
    friends: FriendType[]
  }
}

let state: StateType = {
  profilePage: {
    posts: [
      {id: '1', message: 'Hi, how are you?', likesCount: 12},
      {id: '2', message: 'It\'s my first post', likesCount: 11}
    ],
  },
  dialogsPage: {
    dialogs: [
      {id: '1', name: 'Dimych'},
      {id: '2', name: 'Valera'},
      {id: '3', name: 'Sasha'},
      {id: '4', name: 'Petia'},
      {id: '5', name: 'Masha'},
    ],
    messages: [
      {id: '1', message: 'Hi'},
      {id: '2', message: 'How are you?'},
      {id: '3', message: 'Yo'},
      {id: '4', message: 'Fine, bro'},
    ],
  },
  sidebar: {
    friends: [
      {id: '1', name: 'Dimych'},
      {id: '2', name: 'Valera'},
      {id: '3', name: 'Sasha'},
    ],
  }
}

export default state