import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {dialogDataType, MessagesType} from './components/Dialogs/Dialogs';
import {MessagesPostType} from './components/Profile/MyPosts/Post/Post';

let dialogsData: dialogDataType[] = [
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
let messagesPosts: MessagesPostType[] = [
  {id: '1', message: 'Hi, how are you?', likesCount: 12},
  {id: '2', message: 'It\'s my first post', likesCount: 11}
]

ReactDOM.render(
    <App dialogsData={dialogsData} messages={messages} messagesPosts={messagesPosts}/>,
  document.getElementById('root')
);