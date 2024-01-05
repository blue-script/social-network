import './index.css';
import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {AppRootStateType, store} from './redux/redux-store';

export const rerenderEntireTree= (state: AppRootStateType) => {
  ReactDOM.render(
    <BrowserRouter>
      <App store={store}/>
    </BrowserRouter>,
    document.getElementById('root')
  );
}

rerenderEntireTree(store.getState())
store.subscribe(()=>{
  const state = store.getState()
  rerenderEntireTree(state)
})
