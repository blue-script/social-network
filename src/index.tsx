import './index.css';
import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {StateType, store} from './redux/store';

export const rerenderEntireTree= (state: StateType) => {
  ReactDOM.render(
    <BrowserRouter>
      <App state={state}
           addPost={store.addPost.bind(store)}
           updateNewPostText={store.updateNewPostText.bind(store)}
           sendMessage={store.sendMessage.bind(store)}
           updateNewMessageText={store.updateNewMessageText.bind(store)}
      />
    </BrowserRouter>,
    document.getElementById('root')
  );
}

rerenderEntireTree(store.getState())
store.subscriber(rerenderEntireTree)