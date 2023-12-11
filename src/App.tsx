import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import Dialogs, {DialogType, MessagesType} from './components/Dialogs/Dialogs'
import {PostType} from './components/Profile/MyPosts/Post/Post';
import Profile from './components/Profile/Profile'
import {BrowserRouter, Route} from 'react-router-dom'
import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import {FriendType} from './components/Friends/Friends';

type AppPropsType = {
  state: {
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
}

const App: React.FC<AppPropsType> = (props) => {

  return (
      <div className='app-wrapper'>
        <Header/>
        <Navbar state={props.state.sidebar}/>
        <div className={'app-wrapper-content'}>
          <Route path='/dialogs' render={() => <Dialogs state={props.state.dialogsPage}/>}/>
          <Route path='/profile' render={() => <Profile state={props.state.profilePage}/>}/>
          <Route path='/news' render={() => <News/>}/>
          <Route path='/music' render={() => <Music/>}/>
          <Route path='/settings' render={() => <Settings/>}/>
        </div>
      </div>
  )
}

export default App
