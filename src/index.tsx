import './index.css';
import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {StateType, store} from './redux/state';

export const rerenderEntireTree= (state: StateType) => {
  ReactDOM.render(
    <BrowserRouter>
      <App state={state} dispatch={store.dispatch.bind(store)}/>
    </BrowserRouter>,
    document.getElementById('root')
  );
}

rerenderEntireTree(store.getState())
store.subscriber(rerenderEntireTree)
