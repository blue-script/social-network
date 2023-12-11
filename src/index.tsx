import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {dialogType, MessagesType} from './components/Dialogs/Dialogs';
import {PostType} from './components/Profile/MyPosts/Post/Post';

let dialogs: dialogType[] = [
  {id: '1', name: 'Dimych'},
  {id: '2', name: 'Valera'},
  {id: '3', name: 'Sasha'},
  {id: '4', name: 'Petia'},
  {id: '5', name: 'Masha'},
]
let messages: MessagesType[] = [
  {id: '1', message: 'Hi'},
  {id: '2', message: 'How are you?'},
  {id: '3', message: 'Yo'},
]
let posts: PostType[] = [
  {id: '1', message: 'Hi, how are you?', likesCount: 12},
  {id: '2', message: 'It\'s my first post', likesCount: 11}
]

ReactDOM.render(
  <App dialogs={dialogs} messages={messages} posts={posts}/>,
  document.getElementById('root')
);